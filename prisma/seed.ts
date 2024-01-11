/**
 * Seed script for the database.
 */

import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';
import items from './item-data.json';

const db = new PrismaClient()

async function main(){
    // Categories
    const friedRice = await db.itemCategory.upsert({
        where: {id: 1},
        update: {},
        create: {
            label: 'Fried Rice',
            section: 'HOT_KITCHEN'
        }
    });

    const kottu = await db.itemCategory.upsert({
        where: {id: 2},
        update: {},
        create: {
            label: 'Kottu',
            section: 'HOT_KITCHEN'
        }
    });

    const side = await db.itemCategory.upsert({
        where: {id: 3},
        update: {},
        create: {
            label: 'Sides',
            section: "HOT_KITCHEN"
        }
    });

    const bbq = await db.itemCategory.upsert({
        where: {id: 4},
        update: {},
        create: {
            label: 'BBQ',
            section: 'BBQ_N_GRILL'
        }
    });

    const burger = await db.itemCategory.upsert({
        where: {id: 5},
        update: {},
        create: {
            label: 'Burger',
            section: 'BBQ_N_GRILL'
        }
    });

    const submarine = await db.itemCategory.upsert({
        where: {id: 6},
        update: {},
        create: {
            label: 'Submarines',
            section: 'BBQ_N_GRILL'
        }
    });

    const chai = await db.itemCategory.upsert({
        where: {id: 7},
        update: {},
        create: {
            label: 'Chai',
            section: 'INDIAN_CUISINE'
        }
    });

    const biriyani = await db.itemCategory.upsert({
        where: {id: 8},
        update: {},
        create: {
            label: 'Biriyani',
            section: 'INDIAN_CUISINE'
        }
    });

    const cheeseCorn = await db.itemCategory.upsert({
        where: {id:9},
        update: {},
        create: {
            label: 'Cheese Corn',
            section: 'INDIAN_CUISINE'
        }
    });

    //Items
    await Promise.all(items.map((item,i)=>(
        db.item.upsert({
            where: {id: i},
            update: {},
            create: {
                name: item.name,
                photo: item.photo,
                price: item.price,
                categoryId: item.category
            }
        })
    ))).catch(console.log)

    const pins = {
        100: generateRandomPIN(),
        200: generateRandomPIN(),
        300: generateRandomPIN(),
        400: generateRandomPIN()
    }

    // Employees.
    const employee1 = await db.employee.upsert({
        where: {id: 100},
        update: {
            hashedPin: crypto.createHash('sha256').update(pins[100]).digest('hex'),
        },
        create: {
            id: 100,
            name: "Kolitha",
            hashedPin: crypto.createHash('sha256').update(pins[100]).digest('hex'),
            mobile: 94772008505
        }
    });

    const employee2 = await db.employee.upsert({
        where: {id: 200},
        update: {
            hashedPin: crypto.createHash('sha256').update(pins[200]).digest('hex'),
        },
        create: {
            id: 200,
            name: "Shehan",
            hashedPin: crypto.createHash('sha256').update(pins[200]).digest('hex'),
            mobile: 94773121022
        }
    });

    const employee3 = await db.employee.upsert({
        where: {id: 300},
        update: {
            hashedPin: crypto.createHash('sha256').update(pins[300]).digest('hex'),
        },
        create: {
            id: 300,
            name: "Kanishka",
            hashedPin: crypto.createHash('sha256').update(pins[300]).digest('hex'),
            mobile: 94719575003
        }
    });

    const employee4 = await db.employee.upsert({
        where: {id: 400},
        update: {
            hashedPin: crypto.createHash('sha256').update(pins[400]).digest('hex'),
        },
        create: {
            id: 400,
            name: "Jeewantha",
            hashedPin: crypto.createHash('sha256').update(pins[400]).digest('hex'),
            mobile: 94755841388
        }
    });

    return {
        employeePins: pins
    }
    
}

main()
    .then(async (res)=>{;
        console.log(res);
        await db.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await db.$disconnect()
    })


    function generateRandomPIN() {
        // Generate a random 2-byte (16-bit) buffer
        const randomBuffer = crypto.randomBytes(2);
      
        // Convert the buffer to a 4-digit PIN
        const randomPIN = randomBuffer.readUInt16BE() % 10000;
      
        // Ensure the PIN has exactly 4 digits by padding with zeros if necessary
        const formattedPIN = String(randomPIN).padStart(4, '0');
      
        return formattedPIN;
      }