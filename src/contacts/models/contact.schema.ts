import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Contact extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true })
  telefone: string;

  @Prop({ default: true })
  ativo: boolean;

  @Prop({ default: false })
  favorito: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  last_updated: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
