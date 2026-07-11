import { prisma } from "../../lib/prisma"
import { IGearQuery } from "./gear.interface";

const getAllGear = async(query : IGearQuery)=>{
    const result = await prisma.gearItems.findMany({
        include : {
            provider : {
                select : {
                    id : true,
                    name : true,
                    email : true
                }
            },
            reviews : {
                select : {
                    comment : true,
                    rating : true,
                    userId : true
                }
            }
        }
    });
    return result;
}

const getGearDetails = async(gearId : string)=>{

    const gear = await prisma.gearItems.findUnique({
        where : {
            id : gearId
        },
        include : {
            reviews : true
        }
    })

    if(!gear){
        throw new Error("The requested gear was not found.");
    }

    return gear;
}



export const gearServices = {
    getAllGear,
    getGearDetails,
}