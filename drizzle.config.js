import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  url: 'postgresql://neondb_owner:npg_ghEJ3cmwR7GS@ep-morning-river-a8gpot93-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_ghEJ3cmwR7GS@ep-morning-river-a8gpot93-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  }
});