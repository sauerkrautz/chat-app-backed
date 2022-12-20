import { Request, Response } from "express";
import prisma from "../config/Db";
import argon2 from "argon2";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        uuid: true,
        password: true,
        email: true,
      },
    });

    if (!user)
      return res.status(404).json({
        status: 404,
        statusText: "NOT FOUND",
        message: "User Not Found",
      });

    if (
      user?.email === email &&
      (await argon2.verify(user.password, password))
    ) {
      req.session.userid = user.uuid;
      return res
        .status(200)
        .json({ status: 200, statusText: "OK", message: "Authenticated" });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  if (!req.session.user)
    return res.status(403).json({
      status: 403,
      statusText: "UNAUTHORIZED",
      message: "Please Login To Your Account",
    });

  req.session.destroy((error) => {
    if (error)
      return res.status(500).json({
        status: 500,
        statusText: "INTERNAL SERVER ERROR",
        message: "Something Went Wrong",
        error,
      });

    res
      .status(200)
      .json({ status: 200, statusText: "OK", message: "Signed Out" });
  });
};
