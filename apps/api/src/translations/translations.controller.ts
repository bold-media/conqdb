import { ROUTES, SERVICES, locales } from '@app/utils/constants';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TranslationsService } from './translations.service';
import { Permissions } from '@app/auth/decorators/permissions.decorator';
import { UserRole } from '@app/database/schema/user.schema';
import { CreateTranslationSubmissionDto, Messages } from './translations.dto';
import { FastifyRequest } from '@app/interfaces/request.interface';
import { FastifyReply } from 'fastify';
import { deepMerge } from '@app/utils/deepMerge';

@ApiTags(ROUTES.TRANSLATIONS.toUpperCase())
@Controller(ROUTES.TRANSLATIONS)
export class TranslationsController {
  private readonly logger = new Logger(TranslationsController.name);
  constructor(
    @Inject(SERVICES.TRANSLATIONS)
    private readonly translationsService: TranslationsService,
  ) {}

  @Get('/:locale')
  @ApiOperation({
    summary: 'Get translations for a specific locale',
  })
  @Permissions({
    roles: [UserRole.TRANSLATOR, UserRole.MAINTAINER, UserRole.MANAGER],
  })
  @ApiResponse({
    status: 200,
    description: '**OK**',
  })
  async getTranslationsByLocale(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Param('locale') locale: string,
  ) {
    const translations =
      await this.translationsService.getTranslationsByLocale(locale);

    return res.status(200).send({ translations });
  }

  @Post('/:locale')
  @ApiOperation({
    summary: 'Create translations for a specific locale',
  })
  @Permissions({ roles: [UserRole.MANAGER] })
  @ApiResponse({
    status: 201,
    description: '**CREATED**',
  })
  async createTranslationsByLocale(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Param('locale') locale: string,
  ) {
    const newTranslations =
      await this.translationsService.createTranslations(locale);

    return res.status(201).send({ translations: newTranslations });
  }

  @Get('/submission')
  @ApiOperation({
    summary: 'Get translations submission for a specific locale',
  })
  async getAllTranslationsSubmissions() {}

  @Get('/submission/:locale')
  @ApiOperation({
    summary: 'Get all translations submissions for a specific locale',
  })
  @Permissions({ roles: [UserRole.MANAGER] })
  @Post('/submission/:locale')
  @ApiOperation({
    summary: 'Submit translations for a specific locale',
  })
  @ApiResponse({
    status: 201,
    description: '**CREATED**',
  })
  @Permissions({ roles: [UserRole.TRANSLATOR, UserRole.MAINTAINER] })
  async submitTranslationsByLocale(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Param('locale') locale: string,
    @Body() messages: CreateTranslationSubmissionDto,
  ) {
    const submission = await this.translationsService.createSubmission({
      locale,
      messages,
      userId: req.user.id,
    });

    return res.status(201).send({ submission });
  }

  @Post('/submission/:id/approve')
  @ApiOperation({
    summary: 'Approve translations for a specific locale',
  })
  @Permissions({ roles: [UserRole.MAINTAINER] })
  @ApiResponse({
    status: 201,
    description: '**CREATED**',
  })
  async approveTranslation() {}
}
