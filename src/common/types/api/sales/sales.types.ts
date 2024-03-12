/**
 * Sales API Type definitions
 */
import z from 'zod';

export type SalesApiRequestParams = {
    /**
     * @type ISO Date string
     */
    from: string
    /**
     * @type ISO Date String
     */
    to: string
} 

export type GetSalesResponse = {
    finalizedSales: number;
    pendingSales: number;
    total: number
}