import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL is not set. DB calls will fail until configured.');
}

const client = postgres(connectionString || 'postgresql://postgres:postgres@localhost:5432/modoo_rental');

export const db = drizzle(client, { schema });
export { schema };
