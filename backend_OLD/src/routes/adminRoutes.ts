import express, { Router, Request, Response } from "express";
import crypto from "crypto";
import { adminSignup, adminLogin } from "../controllers/adminController";
import nodemailer from "nodemailer";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
import {
  generateResetToken,
  sendResetEmail,
} from "../utilis/passwordResetUtils";
import Admin from "../models/Admin";
import { Op } from "sequelize";

const adminRouter = Router();


adminRouter.post("/signup", adminSignup);
adminRouter.post("/login", adminLogin);

// Example of restricted route

adminRouter.get(
  "/dashboard",
  authenticate,
  authorizeRole("owner"),
  (req, res) => {
    res.json({ message: "Owner Dashboard" });
  }
);

// POST /reset-password
adminRouter.post("/reset-password", async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
       res.status(404).json({ message: "Admin not found" });
      return
    }

    const resetToken = generateResetToken();
    admin.resetToken = resetToken;
    admin.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour expiration
    await admin.save();

    // Send the reset email
    const resetLink = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;
    await sendResetEmail(admin.email, resetLink);

     res
      .status(200)
      .json({ message: "Password reset instructions sent to your email." });
      return
  } catch (error) {
    const err = error as Error;
    console.error("Error resetting password:", err.message);
     res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
      return
  }
});

// POST /reset-password/:token
adminRouter.post("/reset-password/:token",  async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params as { token: string };
  const { newPassword } = req.body;

  try {
    if (!newPassword || newPassword.length < 8) {
       res.status(400).json({ message: "Password must be at least 8 characters long" });
       return
    }

    const admin = await Admin.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: new Date() },
      },
    });

    if (!admin) {
       res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
        return
    }
    admin.password = newPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpires = undefined;
    await admin.save();

     res.status(200).json({ message: "Password reset successfully" });
     return
  } catch (error) {
    const err = error as Error;
    console.error("Error resetting password:", err.message);
     res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
      return
  }
});

export default adminRouter;
