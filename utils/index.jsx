import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
const sql = neon('postgresql://neondb_owner:npg_ghEJ3cmwR7GS@ep-morning-river-a8gpot93-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');
export const db = drizzle({ client: sql }, {schema});