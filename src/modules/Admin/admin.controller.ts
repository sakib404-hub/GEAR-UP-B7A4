import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { adminServices } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.getAllUsers();
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.updateUserStatus();
  }
);

const getAllGear = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.getAllGear();
  }
);

const getAllRentals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.getAllRentals();
  }
);

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};