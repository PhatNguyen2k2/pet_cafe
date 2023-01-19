import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drink, DrinkDocument } from '../model/drink.chema';

@Injectable()
export class DrinnkService {
  constructor(
    @InjectModel(Drink.name) private drinkModel: Model<DrinkDocument>,
  ) {}

  async detail(id: string): Promise<any> {
    if (id) {
      return await this.drinkModel.findById(id).exec();
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
}
