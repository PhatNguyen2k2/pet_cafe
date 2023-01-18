import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type BasketDocument = Basket & Document;
@Schema()
export class Basket {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true, default: 0 })
  buy_amount: number;
  @Prop({ default: Date.now(), index: { expires: '3h' } })
  at: Date;
}
export const BasketSchema = SchemaFactory.createForClass(Basket);
