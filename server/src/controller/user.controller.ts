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
  UseGuards,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
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

  @Get('google')
  @UseGuards(AuthGuard('google-token'))
  async googleLogin(@Req() req: any, @Res() respone: any) {
    // Sau khi xác thực thành công, xử lý đăng nhập hoặc tạo người dùng
    const { user, token } = await this.userServerice.validateGoogleLogin(
      req.user,
      this.jwtService,
    );
    return respone.status(200).json({ user, token });
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
