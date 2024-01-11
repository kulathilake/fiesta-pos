/**
 * database adapter
 */


export class DB {

    /**
     * Finds exactly one match for a query
     * @param query 
     * @param entity 
     * @returns 
     */
    findOne<T>(query: Partial<T>): Promise<T|null> {
        throw new Error('method not implementd')
    }

    save<T>(data: Partial<T>): Promise<T> {
        throw new Error('method not implemented')
    }

    disconnect(): Promise<void> {
        throw new Error('method not implemented');
    }
    
}