import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type DrinkDocument = Drink & Document;
@Schema()
export class Drink {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: false })
  image: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const DrinkSchema = SchemaFactory.createForClass(Drink);
