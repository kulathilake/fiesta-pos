/**
 * OTP Entity
 */

import { Column, Entity, PrimaryColumn } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class OTP {
    @PrimaryColumn()
    requestId: string;

    @Column({nullable:false})
    employeeId: Employee;

    @Column({nullable:false})
    otp: number

    @Column({type:"bigint",nullable:false})
    lifetime: number

    @Column()
    isSent: boolean

    @Column({type:"bigint"})
    sentAt: number

    @Column()
    isUsed: boolean;

    @Column()
    isExpired: boolean;

    @Column({
        type: 'datetime'
    })
    usedAt: Date

}