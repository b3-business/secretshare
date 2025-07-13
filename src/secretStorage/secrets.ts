// Exports "secrets" object that stores secrets and provides methods to add and get secrets. Will not return secrets that have expired.

type Secret = {
  data: string;
  expiresAt: number;
  viewCount: number;
  allowedViews: number;
  hash: string;
  iv: Uint8Array | undefined;
};

type SecretGenerationOptions = {
  secret: string;
  expireIn: number;
  allowedViews: number;
  hash: string;
  iv: Uint8Array | undefined;
};

type UUID = string;

const EXPIRE_DURATION_DAY = 1000 * 60 * 60 * 24;
const EXPIRE_DURATION_WEEK = EXPIRE_DURATION_DAY * 7;

class Secrets {
  secrets: Map<UUID, Secret>;
  constructor() {
    this.secrets = new Map<UUID, Secret>();

    // http://localhost:8000/secret/0000?encryptionKey=OTBXU3IzWHFIN1B1QXNoNi94aE42dz09
    // add dummy secret for debugging
    const jsonDummy =
      `{"encryptedSecret":"FOs0xq5MfCgeo7+9ARxo0nS87mglK+1eVvLQEL0XsJnuG/qDlonzkLc49N41lSwWti4HxgYiHgj1QkAl1AB2nDsTvxkgMy76yL+o7dK1rBG/9OcI1ihjP5dEuhmBbBt16axuMI+sQQx8xzaDBm5lU9YrQQRWeRwAerFOhbw8i5xiC9IAXcTR2CAy39vQLsYlkxuG/9xfLNkqnMxhmeEdrVaTvdhDCbZRLEW3C1zosIXlcZrpWfhNFcozAt47uABs5sPwnPLWK0t9JuzKdP3ogwbUPesKJVKr07u8ZHQ2y+5P4GXIZt+vylCp8BKZtlh6DieYAA4y5Q9+CgFSXuwbyV/aPKp64AbDWVreczjqEmx7yvgSRNIx0dDffgq3miX2DRk15/BDgvm4m4oSjE+k+FMmzo4KQL/Y32ogRMdws/ucRnhYhgTdQG8SNlzBx4jShPsJyoXDnNLLdan8LE4nE1c2N1o/+GDkbRglrrpdk05e+7gjdn/Bu+JKTHRumyn3vb+rEweHwW0YXZSf2fGiFJknMp9fO7Z8vQvlU+If0R82IIR/31Q5xZ933PGNigoOxnEeGwinbgBF3W2+y2sPnX5dOXUTxOGvchlOl5KJWCv7/zMduvb1aNhDSAM1xi+g9CnnvojQr3PBK5WyAnp/51zZSS/C/wViw61uO9agYNMyNGm4MK6mcOyAXOS8MiB+K5JdwwmU527V0HUYsFxYPptqM3dwsYSRMe/tJT6IugFydtxWBfG52Ly6+Ua5zSlHR5noHLhit8LbSWyiAyV/vJ8DMAWoaMkhElOIr4gAdDrrXk3v5kXqxItU7siUWZ1hSSJltWbu4uJ6TexdXr51q7NJbfQx/op4xpJKs9galybLSI2BA71Hc8rwFpFXNvd61SLgDxAgQ8R/L38oiJwF6Y5xp9SEGdsSC/RVvADsmt3wtgZYHRcNuqmj2M1ifkqkEuPo","hash":"PrRoXjEJwiuujfA4W6kfMXx5GVNJt8uXbbD2icVJ51I=","iv":{"0":96,"1":13,"2":81,"3":204,"4":94,"5":37,"6":70,"7":14,"8":204,"9":132,"10":244,"11":40}}`;

    const { encryptedSecret, hash, iv } = JSON.parse(
      jsonDummy,
    );
    this.secrets.set("0000",{
      data: encryptedSecret,
      expiresAt: Date.now() + EXPIRE_DURATION_WEEK * 10000,
      viewCount: 0,
      allowedViews: 1_000_000_000_000,
      hash: hash,
      iv: iv,
    });
  }

  add(
    { secret, expireIn, allowedViews = 1, hash, iv }: SecretGenerationOptions,
  ) {
    const uuid = crypto.randomUUID();
    if (expireIn < 0) {
      expireIn = EXPIRE_DURATION_DAY;
    }
    this.secrets.set(uuid, {
      data: secret,
      expiresAt: Date.now() + expireIn,
      viewCount: 0,
      allowedViews: allowedViews,
      hash: hash,
      iv: iv,
    });
    return uuid;
  }

  get(uuid: UUID) {
    const secret = this.secrets.get(uuid);
    if (!secret) {
      console.log(`No secret found with uuid: ${uuid}`);
      return null;
    }
    if (secret.expiresAt < Date.now()) {
      console.log(`Secret with uuid: ${uuid} has expired and got deleted.`);
      this.secrets.delete(uuid);
      return null;
    }
    
    const viewsLeft = secret.allowedViews - ++secret.viewCount;
    
    if (viewsLeft <= 0) {
      console.log(
        `Secret with uuid: ${uuid} has reached the view limit and got deleted.`,
      );
      this.secrets.delete(uuid);
    }
    console.log(`Secret with uuid: ${uuid} fetched successfully. Views left: ${viewsLeft}`);
    
    return {
      secret: secret.data,
      hash: secret.hash,
      iv: secret.iv,
      viewsLeft: viewsLeft,
    };
  }
}

export const secrets = new Secrets();
