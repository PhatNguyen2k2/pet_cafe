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
import { Product } from '../model/product.chema';
import { ProductService } from '../service/product.service';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async detail(@Param() id: string): Promise<Object> {
    return await this.productService.detail(id);
  }
  @Post('/create')
  async create(@Res() res: any, @Body() product: Product) {
    const requestBody = {
      name: product.name,
      type: product.type,
      price: product.price,
      amount: product.amount,
      image: product.image,
    };
    const newProduct = await this.productService.createProduct(requestBody);
    return res.status(HttpStatus.CREATED).json({ newProduct });
  }
  @Put('/:id')
  async update(
    @Res() res: any,
    @Param('id') id: string,
    @Body() product: Product,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, product);
    return res.status(HttpStatus.OK).json(updatedProduct);
  }
  @Delete('/:id')
  async delete(@Res() res: any, @Param('id') id: string) {
    await this.productService.deleteProduct(id);
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
    const product = await this.productService.getProductByType(type);
    return res.status(HttpStatus.OK).json(product);
  }
}
