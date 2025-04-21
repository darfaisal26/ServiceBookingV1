export const ROLE_IDS = {
  CLIENT: 1,
  WORKER: 2,
  SYSTEM_ADMIN: 3,
  DRIVER: 4,
} as const;

export type AppRole = keyof typeof ROLE_IDS;
