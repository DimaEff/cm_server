import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/mongo';

@Schema({ versionKey: false })
export class Cat extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
