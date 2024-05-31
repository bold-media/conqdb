import * as dotenv from 'dotenv';
import * as path from 'path';

function loadConfig() {
    const environment = process.env.NODE_ENV || 'development';
    const basePath = path.join(__dirname, '..', '..')
    const envPath = path.join(basePath, `.env.${environment}.local`)

    dotenv.config({ path: envPath });
    dotenv.config({ path: path.join(basePath, '.env') }); // Load default .env

    return {
        postgresUrl: process.env.POSTGRES_URL
    }
}

export default loadConfig()