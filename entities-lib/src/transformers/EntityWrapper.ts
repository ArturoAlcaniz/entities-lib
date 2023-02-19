import { BaseEntity } from "typeorm";

export abstract class EntityWrapper extends BaseEntity {
    toString(): string {
        return JSON.stringify(this);
    }
}