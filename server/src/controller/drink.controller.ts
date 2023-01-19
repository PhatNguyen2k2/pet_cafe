import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Drink } from '../model/drink.chema';
import { DrinkService } from '../service/drink.service';

@Controller('/api/drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  async detail(@Query() id: string): Promise<Object> {
    return await this.drinkService.detail(id);
  }
}
