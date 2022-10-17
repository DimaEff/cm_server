import { AbstractRepository } from "@app/mongo/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

import { Cat } from "./schemas/cat.schema";

@Injectable()
export class CatsRepository extends AbstractRepository<Cat> {
    protected readonly logger = new Logger(CatsRepository.name);

    constructor(
        @InjectModel(Cat.name) catModel: Model<Cat>,
        @InjectConnection() connection: Connection,
    ) {
        super(catModel, connection);
    }
}
