import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { SERVICES } from '@app/utils/constants';

@Module({
  controllers: [TranslationsController],
  providers: [
    {
      provide: SERVICES.TRANSLATIONS,
      useClass: TranslationsService,
    },
  ],
  exports: [SERVICES.TRANSLATIONS],
})
export class TranslationsModule {}
