export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-change-this-in-production',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
