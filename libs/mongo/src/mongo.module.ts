import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

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
