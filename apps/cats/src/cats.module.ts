import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoModule } from '@app/mongo';
import { CatsRepository } from './cats.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGO_URI: Joi.string().required(),
            }),
            envFilePath: `./apps/cats/.${process.env.NODE_ENV}.env`,
        }),
        MongoModule,
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
})
export class CatsModule {}