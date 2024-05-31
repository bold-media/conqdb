import config from './src/config/standalone.config';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/schema/index.ts',
    dbCredentials: {
        url: config.postgresUrl
    },
    migrations: {
        table: 'migrations',
    },
    out: './src/database/migrations'
})