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
      if (await bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return {
          name: foundUser.fullname,
          email: foundUser.email,
          address: foundUser.address,
          avatar: foundUser.avatar,
          token: jwt.sign(payload),
        };
      }
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async validateGoogleLogin(profile: any, jwt: JwtService) {
    // Xử lý xác thực và đăng nhập người dùng
    const { email, name, avatar, address } = profile;

    // Tạo mã thông báo truy cập
    const payload = { email };
    const token = jwt.sign(payload);

    return {
      user: { name, email, address, avatar },
      token,
    };
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  // async basketAdd(id: string, quantity: any, user: Object): Promise<Basket> {
  //   let d: any;
  //   try {
  //     d = await this.ProductModel.findById(id);
  //   } catch (e) {
  //     throw new HttpException(
  //       'this product is not exist',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const u = new this.userModel(user);
  //   let basket = await this.basketModel.findById(u._id);
  //   const newItem = {
  //     id: id,
  //     name: d.name,
  //     price: d.price,
  //     quantity: quantity.num,
  //   };
  //   if (basket) {
  //     let flag = basket.items.some((item) => item.id === id);
  //     flag
  //       ? basket.items.forEach((item) => {
  //           if (item.id === id) item.quantity += newItem.quantity;
  //         })
  //       : basket.items.push(newItem);
  //     basket.total += newItem.quantity * newItem.price;
  //     basket.markModified('items');
  //     basket.markModified('total');
  //   } else {
  //     const newBasket = {
  //       _id: u._id.toString(),
  //       items: [],
  //       total: newItem.quantity * newItem.price,
  //     };
  //     newBasket.items.push(newItem);
  //     basket = new this.basketModel(newBasket);
  //   }
  //   return basket.save();
  // }
  async basketAdd(id: string, quantity: any, user: Object): Promise<Basket> {
    try {
      const product = await this.ProductModel.findById(id);
      if (!product) {
        throw new HttpException(
          'This product does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userInstance = new this.userModel(user);
      let basket = await this.basketModel.findById(userInstance._id);

      const newItem = {
        id: id,
        name: product.name,
        price: product.price,
        quantity: quantity.num,
      };

      if (basket) {
        const existingItemIndex = basket.items.findIndex(
          (item) => item.id === id,
        );

        if (existingItemIndex !== -1) {
          basket.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          basket.items.push(newItem);
        }

        basket.total += newItem.quantity * newItem.price;
      } else {
        const newBasket = {
          _id: userInstance._id.toString(),
          items: [newItem],
          total: newItem.quantity * newItem.price,
        };
        basket = new this.basketModel(newBasket);
      }

      basket.markModified('items');
      basket.markModified('total');
      return basket.save();
    } catch (error) {
      throw new HttpException(
        'Error adding product to basket',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async basketRemove(id: string, user: Object): Promise<Basket> {
    try {
      const userInstance = new this.userModel(user);
      let basket = await this.basketModel.findById(userInstance._id);

      if (!basket) {
        throw new HttpException('Basket not found', HttpStatus.NOT_FOUND);
      }

      const itemIndex = basket.items.findIndex((item) => item.id === id);

      if (itemIndex === -1) {
        throw new HttpException(
          'Product not found in basket',
          HttpStatus.NOT_FOUND,
        );
      }

      const removedItem = basket.items[itemIndex];
      basket.items.splice(itemIndex, 1);
      basket.total -= removedItem.quantity * removedItem.price;

      basket.markModified('items');
      basket.markModified('total');

      return basket.save();
    } catch (error) {
      throw new HttpException(
        'Error removing product from basket',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
