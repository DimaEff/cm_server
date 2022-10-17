import { AbstractDocument } from "@app/mongo";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Cat extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
