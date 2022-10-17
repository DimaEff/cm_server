import { AbstractDocument } from "@app/mongo/abstract.schema";
import { MESSAGES } from "@app/mongo/consts";
import { Logger, NotFoundException } from "@nestjs/common";
import {
    ClientSession,
    Connection,
    FilterQuery,
    Model,
    SaveOptions,
    Types,
    UpdateQuery,
} from "mongoose";

export abstract class AbstractRepository<TDoc extends AbstractDocument> {
    protected abstract logger: Logger;

    constructor(
        protected readonly model: Model<TDoc>,
        private readonly connection: Connection,
    ) {}

    async create(doc: Omit<TDoc, "_id">, options?: SaveOptions): Promise<TDoc> {
        const createdDoc = new this.model({
            ...doc,
            _id: new Types.ObjectId(),
        });
        return (await createdDoc.save(options)).toJSON as unknown as TDoc;
    }

    async findOne(filter: FilterQuery<TDoc>): Promise<TDoc> {
        const doc = await this.model.findOne(filter);
        this.checkDocAndThrowException(doc, filter);

        return doc;
    }

    async findOneAndUpdate(
        filter: FilterQuery<TDoc>,
        update: UpdateQuery<TDoc>,
    ): Promise<TDoc> {
        const doc = await this.model.findOneAndUpdate(filter, update);
        this.checkDocAndThrowException(doc, filter);

        return doc;
    }

    async upsert(
        filter: FilterQuery<TDoc>,
        update: UpdateQuery<TDoc>,
    ): Promise<TDoc> {
        return this.model.findOneAndUpdate(filter, update, {
            lean: true,
            upsert: true,
            new: true,
        });
    }

    async find(filter: FilterQuery<TDoc>): Promise<TDoc[]> {
        return this.model.find(filter, {}, { lean: true });
    }

    async startTransaction(): Promise<ClientSession> {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }

    private checkDocAndThrowException(
        doc: TDoc | undefined,
        filter: FilterQuery<TDoc>,
    ): void {
        if (!doc) {
            this.logger.warn(MESSAGES.getDocumentNotFoundWithQuery(filter));
            throw new NotFoundException(MESSAGES.DOCUMENT_NOT_FOUND);
        }
    }
}
