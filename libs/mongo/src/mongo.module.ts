import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                // uri: "mongodb://localhost:27017/myapp",
                uri: configService.get<string>("MONGO_URI"),

            }),
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule {}
