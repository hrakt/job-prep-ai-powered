import { env } from "@/data/env/server";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle/migration',
    schema: './drizzle/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});