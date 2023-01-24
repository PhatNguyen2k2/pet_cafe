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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Drink } from '../model/drink.chema';
import { DrinkService } from '../service/drink.service';

@Controller('/api/drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Get()
  async detail(@Query() id: string): Promise<Object> {
    return await this.drinkService.detail(id);
  }
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() res: any,
    @Body() drink: Drink,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    const uploadImage = await this.drinkService.uploadImage(file);
    const requestBody = {
      name: drink.name,
      type: drink.type,
      price: drink.price,
      image: uploadImage.url,
    };
    const newDrink = await this.drinkService.createDrink(requestBody);
    return res.status(HttpStatus.CREATED).json({ newDrink });
  }
}
