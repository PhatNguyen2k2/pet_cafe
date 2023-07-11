import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-token';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../utils/constants';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(
  Strategy,
  'google-token',
) {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    // Gọi hàm xác thực của AuthService và truyền kết quả thông qua hàm callback "done"
    const user = await this.userService.validateGoogleLogin(
      profile,
      this.jwtService,
    );
    done(null, user);
  }
}
