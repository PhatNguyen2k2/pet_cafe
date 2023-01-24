import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drink, DrinkDocument } from '../model/drink.chema';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import toStream from 'buffer-to-stream';
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from '../utils/constants';

@Injectable()
export class DrinkService {
  constructor(
    @InjectModel(Drink.name) private drinkModel: Model<DrinkDocument>,
  ) {}

  async detail(id: any): Promise<any> {
    if (id.id) {
      return await this.drinkModel.findById(id.id).exec();
    } else return new HttpException('Can not find', HttpStatus.NOT_FOUND);
  }

  async createDrink(drink: Object): Promise<Drink> {
    const newDrink = new this.drinkModel(drink);
    return newDrink.save();
  }

  async updateDrink(id: string, drink: Object): Promise<Drink> {
    return this.drinkModel.findByIdAndUpdate(id, drink, { new: true });
  }

  async deleteDrink(id: string): Promise<any> {
    return this.drinkModel.findByIdAndRemove(id);
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    v2.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
    });
    // Check if the size of the file is more than 1M
    if (file.size > 1000000) {
      throw new Error('Please upload a file size not more than 1M');
    }
    // Check if the file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new Error('Sorry, this file is not an image, please try again');
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
