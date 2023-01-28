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
import { Product } from '../model/product.chema';
import { ProductService } from '../service/product.service';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async detail(@Query() id: string): Promise<Object> {
    return await this.productService.detail(id);
  }
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() res: any,
    @Body() product: Product,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    const uploadImage = await this.productService.uploadImage(file);
    const requestBody = {
      name: product.name,
      type: product.type,
      price: product.price,
      image: uploadImage.url,
    };
    const newProduct = await this.productService.createProduct(requestBody);
    return res.status(HttpStatus.CREATED).json({ newProduct });
  }
  @Put('/:id')
  async update(@Res() res: any, @Param('id') id: string, @Body() product: Product) {
    const updatedProduct = await this.productService.updateProduct(id, product);
    return res.status(HttpStatus.OK).json(updatedProduct);
  }
  @Delete('/:id')
  async delete(@Res() res: any, @Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return res.status(HttpStatus.OK);
  }
}