import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type BillDocument = Bill & Document;
@Schema()
export class Bill {
  @Prop({ required: true })
  details: [
    {
      _id: string;
      name: string;
      price: number;
      amount: number;
    },
  ];
  @Prop({ required: true })
  total: number;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const BillSchema = SchemaFactory.createForClass(Bill);
