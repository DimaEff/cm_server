import { MongoModule } from "@app/mongo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";

import { CatsController } from "./cats.controller";
import { CatsRepository } from "./cats.repository";
import { CatsService } from "./cats.service";
import { Cat, CatSchema } from "./schemas/cat.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_URI: Joi.string().required(),
            }),
            envFilePath: `./apps/cats/.dev.env`,
        }),
        MongoModule,
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
})
export class CatsModule {}
