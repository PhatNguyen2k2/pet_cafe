import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Basket } from './basket.chema';

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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Basket' })
  drink_basket: Basket;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Basket' })
  pet_basket: Basket;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
