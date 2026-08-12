import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { UserServices } from "./user.service";

const getUserSummary = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await UserServices.getUserSummary(userId as string);

    res.status(200).json({
      success: true,
      message: "User summary retrieved successfully",
      data: result,
    });
  }
);

const updateUserInformation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await UserServices.updateUserInformation(
      userId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: result,
    });
  }
);

export const userController = {
  getUserSummary,
  updateUserInformation
};