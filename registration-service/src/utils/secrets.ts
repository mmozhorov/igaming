require('dotenv').config()

export const MongoDB = process.env.MONGODB;
export const JWT_SECRET = process.env.JWT_SECRET;
export const AUTH_URL = process.env.AUTH_URL;

if (!MongoDB) {
  console.log('No mongo connection strings. Set MongoDB environment variable.')
  process.exit(1)
}

if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!AUTH_URL) {
  console.log('No AUTH_URL secret string. Set AUTH_URL environment variable.')
  process.exit(1)
}

export const environment = {
  nodeEnv: process.env.NODE_ENV,
  logDir: process.env.LOG_DIR || 'logs',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || 'app.log',
}
