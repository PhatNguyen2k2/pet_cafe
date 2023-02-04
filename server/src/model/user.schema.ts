import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  address: string;
  @Prop({ default: false })
  isAdmin: boolean;
  @Prop({
    default:
      'https://res.cloudinary.com/da5yv096f/image/upload/v1675437152/icons8-cat-head_y9nmtv.gif',
  })
  avatar: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
