import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';
import { UserService } from './service/user.service';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { Product, ProductSchema } from './model/product.chema';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path';
import { isAuthenticated } from './app.middleware';
import { PassportModule } from '@nestjs/passport';
import { GoogleTokenStrategy } from 'passport-google-token';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Basket, BasketSchema } from './model/basket';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Pet_Cafe'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
    PassportModule.register({ defaultStrategy: 'google-token' }),
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, UserService, ProductService, GoogleTokenStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthenticated).forRoutes({
      path: 'api/user/addBasket/:id',
      method: RequestMethod.POST,
    });
  }
}
