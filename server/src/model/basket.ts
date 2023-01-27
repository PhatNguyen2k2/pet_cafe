import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type BasketDocument = Basket & Document;
@Schema()
export class Basket {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true, default: [] })
  items: [
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
    },
  ];
  @Prop({ required: false, default: 0 })
  total: number;
  @Prop({ default: Date.now() })
  createdAt: Date;
}
export const BasketSchema = SchemaFactory.createForClass(Basket);
