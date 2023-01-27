import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  image: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
