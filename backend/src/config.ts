export const PORT = Number(process.env.PORT) || 4000;
export const JWT_SECRET = process.env.JWT_SECRET ?? "creatorhub-dev-secret-change-in-production";
export const JWT_EXPIRES = "8h";
