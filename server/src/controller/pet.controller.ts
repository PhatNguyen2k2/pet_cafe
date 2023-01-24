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
import { Pet } from '../model/pet.schema';
import { PetService } from '../service/pet.service';

@Controller('/api/pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  async detail(@Query() id: string): Promise<Object> {
    return await this.petService.detail(id);
  }
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() res: any,
    @Body() pet: Pet,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    const uploadImage = await this.petService.uploadImage(file);
    const requestBody = {
      name: pet.name,
      type: pet.type,
      price: pet.price,
      image: uploadImage.url,
    };
    const newPet = await this.petService.createPet(requestBody);
    return res.status(HttpStatus.CREATED).json({ newPet });
  }
  @Put('/:id')
  async update(@Res() res: any, @Param('id') id: string, @Body() pet: Pet) {
    const updatedPet = await this.petService.updatePet(id, pet);
    return res.status(HttpStatus.OK).json(updatedPet);
  }
  @Delete('/:id')
  async delete(@Res() res: any, @Param('id') id: string) {
    await this.petService.deletePet(id);
    return res.status(HttpStatus.OK);
  }
}
