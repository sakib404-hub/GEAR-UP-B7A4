import { GearItemStatus } from "../../../generated/prisma/enums";

export interface ICreateGear{
    title : string;
    description : string;
    pricePerDay : number;
    brand : string;
    stockQuantity : number;
    status : GearItemStatus;
    categoryId : string;
}

export interface IUpdateGear{
    title ?: string;
    description ? : string;
    pricePerDay ?: number;
    brand ?: string;
    stockQuantity ?: number;
    status ?: GearItemStatus;
}