import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../model/product.chema';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import toStream from 'buffer-to-stream';
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from '../utils/constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async detail(id: any): Promise<any> {
    if (id.id) {
      return await this.productModel.findById(id.id).exec();
    } else return new HttpException('Can not find', HttpStatus.NOT_FOUND);
  }
  async getProductByType(type: string): Promise<any> {
    if (type) {
      return await this.productModel.find({ type: type });
    } else return await this.productModel.find({});
  }

  async createProduct(product: Object): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async updateProduct(id: string, product: Object): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndRemove(id);
  }
  
  async newProduct(type: string): Promise<any> {
    if (type === 'pet') {
      return this.productModel
        .find({
          type: { $in: ['dog', 'cat'] },
        })
        .sort({ createdDate: 1 })
        .limit(5);
    } else {
      return this.productModel
        .find({
          type: { $nin: ['dog', 'cat'] },
        })
        .sort({ createdDate: 1 })
        .limit(5);
    }
  }
}
