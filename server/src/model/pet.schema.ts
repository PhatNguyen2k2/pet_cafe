import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PetDocument = Pet & Document;
@Schema()
export class Pet {
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
export const PetSchema = SchemaFactory.createForClass(Pet);
