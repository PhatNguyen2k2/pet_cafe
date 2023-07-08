import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  Put,
  Req,
  Res,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from '../model/product.chema';
import { ProductService } from '../service/product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async detail(@Param() id: string): Promise<Object> {
    return await this.productService.detail(id);
  }
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() product: any,
    @Res() res: any,
  ): Promise<Product> {
    const newProduct = await this.productService.createProduct(product, image);
    return res.status(HttpStatus.CREATED).json(newProduct);
  }
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') productId: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateProduct: any,
    @Res() res: any,
  ): Promise<Product> {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProduct,
      image,
    );
    return res.status(HttpStatus.OK).json(updatedProduct);
  }
  @Delete('/:id')
  async delete(@Res() res: any, @Param('id') productId: string) {
    await this.productService.deleteProduct(productId);
    return res.status(HttpStatus.OK);
  }
  @Get('/drink/new')
  async newDrink(@Res() res: any) {
    const type = 'drink';
    const newDrink = await this.productService.newProduct(type);
    return res.status(HttpStatus.OK).json(newDrink);
  }
  @Get('/pet/new')
  async newPet(@Res() res: any) {
    const type = 'pet';
    const newPet = await this.productService.newProduct(type);
    return res.status(HttpStatus.OK).json(newPet);
  }
  @Get('/type/find')
  async productType(@Query('type') type: any, @Res() res: any) {
    await this.productService.getProductByType(type);
    return res.status(HttpStatus.OK);
  }
}
