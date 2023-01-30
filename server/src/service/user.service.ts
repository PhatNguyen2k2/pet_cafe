import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { get, Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import { Basket, BasketDocument } from '../model/basket';
import { Product, ProductDocument } from '../model/product.chema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
  ) {}

  async signup(user: User): Promise<User> {
    const checkUser = await this.getOne(user.email);
    if (checkUser) {
      throw new HttpException('exist', HttpStatus.NOT_ACCEPTABLE);
    }
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

  async basketAdd(id: string, quantity: any, user: Object): Promise<Basket> {
    let d: any;
    try {
      d = await this.ProductModel.findById(id);
    } catch (e) {
      throw new HttpException(
        'this product is not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const u = new this.userModel(user);
    let basket = await this.basketModel.findById(u._id);
    const newItem = {
      id: id,
      name: d.name,
      price: d.price,
      quantity: quantity.num,
    };
    if (basket) {
      let flag = basket.items.some((item) => item.id === id);
      flag
        ? basket.items.forEach((item) => {
            if (item.id === id) item.quantity += newItem.quantity;
          })
        : basket.items.push(newItem);
      basket.total += newItem.quantity * newItem.price;
      basket.markModified('items');
      basket.markModified('total');
    } else {
      const newBasket = {
        _id: u._id.toString(),
        items: [],
        total: newItem.quantity * newItem.price,
      };
      newBasket.items.push(newItem);
      basket = new this.basketModel(newBasket);
    }
    return basket.save();
  }
}
