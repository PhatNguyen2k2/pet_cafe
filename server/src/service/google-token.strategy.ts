import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../utils/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/',
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
