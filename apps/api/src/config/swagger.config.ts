import { ROUTES } from "@app/utils/constants";
import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('ConqDB API')
.setDescription('API that serves https://conqdb.com/')
.setVersion('1.0')
.addTag(ROUTES.CACHE.toUpperCase(), 'Utilities for debugging the redis cache layer.')
.build()