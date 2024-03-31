// Exports "secrets" object that stores secrets and provides methods to add and get secrets. Will not return secrets that have expired.

type Secret = {
  data: string;
  expiresAt: number;
};

type UUID = string;

const EXPIRE_DURATION_DAY = 1000 * 60 * 60 * 24;
const EXPIRE_DURATION_WEEK = EXPIRE_DURATION_DAY * 7;

class Secrets {
  secrets: Map<UUID, Secret>;
  constructor() {
    this.secrets = new Map<UUID, Secret>();
  }

  add(secret: string) {
    const uuid = crypto.randomUUID();
    this.secrets.set(uuid, {
      data: secret,
      expiresAt: Date.now() + EXPIRE_DURATION_DAY,
    });
    return uuid;
  }

  get(uuid: UUID) {
    const secret = this.secrets.get(uuid);
    if (!secret) {
      return null;
    }
    if (secret.expiresAt < Date.now()) {
      this.secrets.delete(uuid);
      return null;
    }

    this.secrets.delete(uuid);
    return secret.data;
  }
}

export const secrets = new Secrets();
