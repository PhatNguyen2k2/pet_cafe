import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';
import { UserService } from './service/user.service';
import { DrinkController } from './controller/drink.controller';
import { DrinkService } from './service/drink.service';
import { Drink, DrinkSchema } from './model/drink.chema';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path';
import { isAuthenticated } from './app.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Pet_Cafe'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Drink.name, schema: DrinkSchema }]),
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
  controllers: [AppController, UserController, DrinkController],
  providers: [AppService, UserService, DrinkService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude(
  //       { path: 'api/v1/video/:id', method: RequestMethod.GET }
  //     )
  //     .forRoutes(...);
  // }
}
