import { GearItemStatus } from "../../../generated/prisma/enums";

export interface ICreateGear{
    title : string;
    description : string;
    pricePerDay : number;
    brand : string;
    stockQuantity : number;
    availabilityStatus : GearItemStatus;
    categoryId : string;
}