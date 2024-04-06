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

    if (secret.viewCount++ >= secret.allowedViews) {
      console.log(
        `Secret with uuid: ${uuid} has reached the view limit and got deleted.`,
      );
      this.secrets.delete(uuid);
      return null;
    }

    console.log(`Secret with uuid: ${uuid} fetched successfully.`);
    return {
      secret: secret.data,
      hash: secret.hash,
      iv: secret.iv,
      viewsLeft: secret.allowedViews - secret.viewCount,
    };
  }
}

export const secrets = new Secrets();
