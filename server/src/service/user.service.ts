import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import { Basket, BasketDocument } from '../model/basket';
import { Drink, DrinkDocument } from '../model/drink.chema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Drink.name) private drinkModel: Model<DrinkDocument>,
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
  ) {}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      fullname: user.fullname,
      email: user.email,
      address: user.address,
      password: hash,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async signin(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return {
          token: jwt.sign(payload),
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async basketAdd(id: string, buyAmount: number, user: Object): Promise<any> {
    const d = await this.drinkModel.findById(id);
    const u = new this.userModel(user);
    let newBasket = new Basket();
    newBasket = {
      _id: d.id,
      name: d.name,
      price: d.price,
      buy_amount: buyAmount,
      at: Date.now(),
    };
    if (d.type === 'cat' || d.type === 'dog') {
      if (u.pet_basket.length < 1) u.pet_basket.push(newBasket);
      else {
        let flag = u.pet_basket.some((basket) => basket._id === newBasket._id);
        flag
          ? u.pet_basket.forEach((basket) => {
              if (basket._id === newBasket._id)
                basket.buy_amount += newBasket.buy_amount;
            })
          : u.pet_basket.push(newBasket);
      }
    } else {
      if (u.drink_basket.length < 1) u.drink_basket.push(newBasket);
      else {
        let flag = u.drink_basket.some(
          (basket) => basket._id === newBasket._id,
        );
        flag
          ? u.drink_basket.forEach((basket) => {
              if (basket._id === newBasket._id)
                basket.buy_amount += newBasket.buy_amount;
            })
          : u.drink_basket.push(newBasket);
      }
    }
    u.save();
    return new HttpException('added', HttpStatus.ACCEPTED);
  }
}
