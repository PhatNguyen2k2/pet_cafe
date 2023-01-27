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
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userServerice: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async Signup(@Res() response: any, @Body() user: User) {
    console.log(user);
    const newUSer = await this.userServerice.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async SignIn(@Res() response: any, @Body() user: User) {
    const token = await this.userServerice.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
  @Post('/addBasket/:id')
  async addBasket(
    @Res() res: any,
    @Req() req: any,
    @Param('id') id: string,
    @Body() quantity: any,
  ) {
    const newBasket = await this.userServerice.basketAdd(
      id,
      quantity,
      req.user,
    );
    return res.status(HttpStatus.OK).json({
      newBasket,
    });
  }
}
