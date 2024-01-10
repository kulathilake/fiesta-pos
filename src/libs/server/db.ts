/**
 * database adapter
 */

import { Service } from "typedi";
import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from "typeorm";

@Service()
export class DB {
    private datasource: DataSource
    constructor(){
        this.datasource = new DataSource({
            type:'mariadb',

        })
    }
    /**
     * Finds exactly one match for a query
     * @param query 
     * @param entity 
     * @returns 
     */
    findOne<T extends ObjectLiteral>(query: Partial<T>, entity: EntityTarget<T>): Promise<T|null> {
        return this.datasource.getRepository(entity).findOneBy(query);
    }

    save<T extends ObjectLiteral>(data: DeepPartial<T>, entity: EntityTarget<T>): Promise<T> {
        return this.datasource.getRepository(entity).save(data);
    }

    disconnect(): Promise<void> {
        throw new Error('method not implemented');
    }
    
}