import { InjectDatabase } from '@app/database/database.decorator';
import { schema } from '@app/database/schema/index.schema';
import { locales } from '@app/utils/constants';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateTranslationSubmissionDto, Messages } from './translations.dto';
import {
  InferredTranslations,
  translationSubmissions as translationSubmissionsSchema,
  translations as translationsSchema,
} from '@app/database/schema/translations.schema';
import { eq } from 'drizzle-orm';
import { deepMerge } from '@app/utils/deepMerge';

@Injectable()
export class TranslationsService {
  private readonly logger = new Logger(TranslationsService.name);

  constructor(
    @InjectDatabase() private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async getTranslationsByLocale(
    locale: string,
  ): Promise<InferredTranslations | null> {
    try {
      const englishTranslations = await this.db.query.translations.findFirst({
        where: eq(translationsSchema.locale, 'en'),
      });

      if (!englishTranslations) {
        throw new NotFoundException('Missing english translations...');
      }

      const messages = new Messages();

      englishTranslations.messages = deepMerge(
        messages,
        englishTranslations.messages,
      );

      if (locale === 'en') {
        return englishTranslations;
      }

      const requestedTranslations = await this.db.query.translations.findFirst({
        where: eq(translationsSchema.locale, locale),
      });

      if (!requestedTranslations) {
        throw new NotFoundException(
          `No translations found for locale: ${locale}`,
        );
      }

      return {
        ...requestedTranslations,
        messages: deepMerge(
          englishTranslations.messages,
          requestedTranslations.messages,
        ),
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(`An unexpected error occurred`);
    }
  }

  async createTranslations(locale: string) {
    try {
      const result = await this.db
        .insert(translationsSchema)
        .values({ locale })
        .returning();

      return result[0];
    } catch (error) {
      switch (error.code) {
        case '23505': // PostgreSQL unique violation
          throw new ConflictException('Locale already exists');
        case '22P02': // PostgreSQL invalid text representation
          throw new BadRequestException('Invalid input syntax');
        default:
          throw new InternalServerErrorException(
            'An unexpected error occurred',
          );
      }
    }
  }

  async createSubmission({
    locale,
    messages,
    userId,
  }: {
    locale: string;
    messages: CreateTranslationSubmissionDto;
    userId: string;
  }) {
    try {
      const submission = await this.db
        .insert(translationSubmissionsSchema)
        .values({
          locale,
          partialMessages: messages,
          submittedBy: userId,
        })
        .returning();

      return submission[0];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`An unexpected error occurred`);
    }
  }
}
