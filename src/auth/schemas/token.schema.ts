import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/schemas/users.schema';

export type TokenDocument = Token & Document;

@Schema({ toJSON: { virtuals: true } })
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true, trim: true })
  token: string;

  @Prop({ required: true, trim: true })
  type: 'access' | 'refresh';
}

export const TokenSchema = SchemaFactory.createForClass(Token);
