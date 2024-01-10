/**
 * Employee Entity
 */

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn,  } from "typeorm";

@Entity()
export class Employee {

    @PrimaryColumn()
    employeeId: string
    
    @Column()
    firstName: string;

    @Column()
    lastName: string; 
    
    @Column({type:'string', unique: true, nullable:false})
    mobileNumber: string
}