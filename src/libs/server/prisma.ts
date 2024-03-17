import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient
export function getPrismaClient(){
    if(!prismaClient){
        prismaClient = new PrismaClient();
    }
    return prismaClient;
}