import { GearItemsWhereInput } from "../../../generated/prisma/models";

export interface IGearQuery {
  brand?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
}