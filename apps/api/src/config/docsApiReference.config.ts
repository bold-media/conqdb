import { OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const docsApiReference = (
  document: OpenAPIObject,
): ReturnType<typeof apiReference> =>
  apiReference({
    metaData: {
      title: 'ConqDB API Reference Docs',
      description: 'API reference docs for conqdb.com',
    },
    spec: {
      content: document,
    },
    authentication: {
      customSecurity: true,
      apiKey: {
        token:
          process.env.NODE_ENV === 'development'
            ? process.env.ADMIN_API_KEY
            : null,
      },
    },
    withFastify: true,
    theme: 'default',
    layout: 'modern',
    customCss: `
      .darklight-reference-promo {
        display: none !important;
      }

      .darklight {
        margin-bottom: 1.1rem;
      }
    `,
  });
