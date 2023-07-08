import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../model/product.chema';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable, Stream } from 'stream';
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

  async createProduct(product: any, image: Express.Multer.File): Promise<any> {
    try {
      let imageUrl: string = null;
      const stream = v2.uploader.upload_stream(
        {
          folder: 'Products', // Tên thư mục trên Cloudinary
          api_key: CLOUDINARY_KEY,
          cloud_name: CLOUDINARY_NAME,
          api_secret: CLOUDINARY_SECRET,
        },
        async (error, result) => {
          if (error) {
            console.log(error);
            throw new HttpException(
              'Error uploading image',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          imageUrl = result.secure_url;

          // Tạo đối tượng sản phẩm mới và lưu vào cơ sở dữ liệu
          const newProduct = new this.productModel({
            name: product.name,
            type: product.type,
            price: product.price,
            amount: product.amount,
            image: imageUrl,
          });
          return await newProduct.save();
        },
      );
      // Pipe dữ liệu từ stream của tệp tin vào upload stream của Cloudinary
      const buffer = image.buffer; // Dữ liệu tệp tin dưới dạng buffer
      stream.write(buffer);
      stream.end();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(
    productId: string,
    updateProduct: any,
    image: any,
  ): Promise<Product> {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Xóa ảnh cũ trên Cloudinary nếu có
      if (product.image) {
        const publicId = this.extractPublicId(product.image);
        await this.deleteImageFromCloudinary(publicId);
      }

      let imageUrl: string = null;

      if (image) {
        const uploadStream = v2.uploader.upload_stream(
          {
            folder: 'Products',
            api_key: CLOUDINARY_KEY,
            cloud_name: CLOUDINARY_NAME,
            api_secret: CLOUDINARY_SECRET,
          },
          async (error, result) => {
            if (error) {
              console.log(error);
              throw new HttpException(
                'Error uploading image',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
            imageUrl = result.secure_url;

            // Cập nhật thông tin sản phẩm và đường dẫn ảnh mới
            product.name = updateProduct.name;
            product.type = updateProduct.type;
            product.price = updateProduct.price;
            product.amount = updateProduct.amount;
            product.image = imageUrl;

            return await product.save();
          },
        );

        // Đọc dữ liệu từ stream tệp tin và ghi vào stream tải lên của Cloudinary
        const buffer = image.buffer;
        uploadStream.write(buffer);
        uploadStream.end();
      } else {
        // Nếu không có ảnh mới được tải lên, chỉ cập nhật thông tin sản phẩm
        product.name = updateProduct.name;
        product.type = updateProduct.type;
        product.price = updateProduct.price;
        product.amount = updateProduct.amount;

        return await product.save();
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractPublicId(url: string): string {
    const startIndex = url.lastIndexOf('Products/') + 9;
    const endIndex = url.lastIndexOf('.');
    return url.substring(startIndex, endIndex);
  }

  private async deleteImageFromCloudinary(publicId: string): Promise<void> {
    try {
      await v2.api.delete_resources_by_prefix(`Products/${publicId}`, {
        api_key: CLOUDINARY_KEY,
        cloud_name: CLOUDINARY_NAME,
        api_secret: CLOUDINARY_SECRET,
      });
    } catch (error) {
      throw new HttpException(
        'Error deleting image from Cloudinary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteProduct(productId: string): Promise<void> {
    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      // Xóa ảnh trên Cloudinary nếu có
      if (product.image) {
        const publicId = this.extractPublicId(product.image);
        await this.deleteImageFromCloudinary(publicId);
      }
      await this.productModel.findByIdAndRemove(productId);
    } catch (error) {
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
