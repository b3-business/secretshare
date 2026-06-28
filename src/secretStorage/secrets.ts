import { IS_DENO_DEPLOY } from "@/src/utils/launch.ts";

// Exports "secrets" object that stores secrets and provides methods to add and get secrets. Will not return secrets that have expired.
const secretKv = await Deno.openKv(IS_DENO_DEPLOY ? undefined : ":memory:");

type Secret = {
  data: string;
  expiresAt: number;
  viewCount: number;
  allowedViews: number;
  iv: Uint8Array | undefined;
};

type SecretGenerationOptions = {
  secret: string;
  expireIn: number;
  allowedViews: number;
  iv: Uint8Array | undefined;
};

type UUID = string;

const EXPIRE_DURATION_DAY = 1000 * 60 * 60 * 24;
const EXPIRE_DURATION_WEEK = EXPIRE_DURATION_DAY * 7;

class Secrets {
  secrets: Deno.Kv;
  constructor() {
    this.secrets = secretKv;

    // http://localhost:8000/secret/0000?encryptionKey=OTBXU3IzWHFIN1B1QXNoNi94aE42dz09
    // add dummy secret for debugging
    const jsonDummy =
      `{"encryptedSecret":"FOs0xq5MfCgeo7+9ARxo0nS87mglK+1eVvLQEL0XsJnuG/qDlonzkLc49N41lSwWti4HxgYiHgj1QkAl1AB2nDsTvxkgMy76yL+o7dK1rBG/9OcI1ihjP5dEuhmBbBt16axuMI+sQQx8xzaDBm5lU9YrQQRWeRwAerFOhbw8i5xiC9IAXcTR2CAy39vQLsYlkxuG/9xfLNkqnMxhmeEdrVaTvdhDCbZRLEW3C1zosIXlcZrpWfhNFcozAt47uABs5sPwnPLWK0t9JuzKdP3ogwbUPesKJVKr07u8ZHQ2y+5P4GXIZt+vylCp8BKZtlh6DieYAA4y5Q9+CgFSXuwbyV/aPKp64AbDWVreczjqEmx7yvgSRNIx0dDffgq3miX2DRk15/BDgvm4m4oSjE+k+FMmzo4KQL/Y32ogRMdws/ucRnhYhgTdQG8SNlzBx4jShPsJyoXDnNLLdan8LE4nE1c2N1o/+GDkbRglrrpdk05e+7gjdn/Bu+JKTHRumyn3vb+rEweHwW0YXZSf2fGiFJknMp9fO7Z8vQvlU+If0R82IIR/31Q5xZ933PGNigoOxnEeGwinbgBF3W2+y2sPnX5dOXUTxOGvchlOl5KJWCv7/zMduvb1aNhDSAM1xi+g9CnnvojQr3PBK5WyAnp/51zZSS/C/wViw61uO9agYNMyNGm4MK6mcOyAXOS8MiB+K5JdwwmU527V0HUYsFxYPptqM3dwsYSRMe/tJT6IugFydtxWBfG52Ly6+Ua5zSlHR5noHLhit8LbSWyiAyV/vJ8DMAWoaMkhElOIr4gAdDrrXk3v5kXqxItU7siUWZ1hSSJltWbu4uJ6TexdXr51q7NJbfQx/op4xpJKs9galybLSI2BA71Hc8rwFpFXNvd61SLgDxAgQ8R/L38oiJwF6Y5xp9SEGdsSC/RVvADsmt3wtgZYHRcNuqmj2M1ifkqkEuPo","iv":{"0":96,"1":13,"2":81,"3":204,"4":94,"5":37,"6":70,"7":14,"8":204,"9":132,"10":244,"11":40}}`;

    const { encryptedSecret, iv } = JSON.parse(
      jsonDummy,
    );

    const dummySecret = {
      data: encryptedSecret,
      expiresAt: Date.now() + EXPIRE_DURATION_WEEK * 10000,
      viewCount: 0,
      allowedViews: 1_000_000_000_000,
      iv: iv,
    };

    // no await here, its the constructor. its the debugging secret, its fine. async constructor is not allowed anyway.
    this.secrets.set(["secrets", "0000"], dummySecret).then((res)=> {
      console.log(`Dummy secret added or replaced for debugging: ${res.ok}`);
    });
  }

  async add(
    { secret, expireIn, allowedViews = 1, iv }: SecretGenerationOptions,
  ) {
    const uuid = crypto.randomUUID();
    if (expireIn < 0) {
      expireIn = EXPIRE_DURATION_DAY;
    }

    const secretObj: Secret = {
      data: secret,
      expiresAt: Date.now() + expireIn,
      viewCount: 0,
      allowedViews: allowedViews,
      iv: iv,
    };

    await this.secrets.atomic()
      .set(["secrets", uuid], secretObj)
      .set(["secretByExpireTimestamp", secretObj.expiresAt], ["secrets", uuid])
      .commit();

    this.deleteExpiredSecrets()
    
    return uuid;
  }

  async get(uuid: UUID) {
    const { value: secret } = await this.secrets.get<Secret>(["secrets", uuid]);
    if (!secret) {
      console.log(`No secret found with uuid: ${uuid}`);
      return null;
    }
    if (secret.expiresAt < Date.now()) {
      console.log(`Secret with uuid: ${uuid} has expired and got deleted.`);
      await this.secrets.delete(["secrets", uuid]);
      this.secrets.delete(["secretByExpireTimestamp", secret.expiresAt]);
      return null;
    }
    
    const viewsLeft = secret.allowedViews - ++secret.viewCount;
    if (viewsLeft < 0) {
      console.log(`Secret ${uuid} should have already been deleted. This may happen due to deno kv, hard block.`);
      return null;
    }
    
    if (viewsLeft <= 0) {
      console.log(
        `Secret with uuid: ${uuid} has reached the view limit and got deleted.`,
      );
      await this.secrets.delete(["secrets", uuid]);
      await this.secrets.delete(["secretByExpireTimestamp", secret.expiresAt]);
      // we dont return here. We still return the secret even if it has reached the view limit, but we delete it from storage, so it cannot be fetched again. 
    }



    console.log(`Secret with uuid: ${uuid} fetched successfully. Views left: ${viewsLeft}`);

    await this.secrets.set(["secrets", uuid], secret); // update viewCount

    this.deleteExpiredSecrets()
    
    return {
      secret: secret.data,
      iv: secret.iv,
      viewsLeft: viewsLeft,
    };
  }
  async deleteExpiredSecrets() {
    const now = Date.now();
    const expiredSecrets = this.secrets.list<Deno.KvKey>({
      prefix: ["secretByExpireTimestamp"],
      end: ["secretByExpireTimestamp", now],
      });
    for await (const { key, value: secretsKey } of expiredSecrets) {
      if (secretsKey) {
        const res = await this.secrets.atomic()
          .delete(secretsKey)
          .delete(key)
          .commit();
        if (!res.ok) {
          console.error(`Failed to delete expired secret with uuid: ${secretsKey}`);
        } else {
          console.log(`Deleted expired secret with uuid: ${secretsKey}`);
        }
      }
    }
  }
}

export const secrets = new Secrets();
