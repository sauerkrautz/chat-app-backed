import prisma from "../config/Db";
import { Request, Response } from "express";
import argon2 from "argon2";

export const addUser = async (req: Request, res: Response) => {
  const { email, username, number, password } = req.body;

  try {
    await prisma.user.create({
      data: {
        email,
        username,
        password: await argon2.hash(password),
        number,
      },
    });

    res
      .status(201)
      .json({ status: 201, statusText: "OK", message: "User Created" });
  } catch (error: any) {
    switch (error.meta.target) {
      case "User_email_key":
        res.status(500).json({
          status: 500,
          statusText: "DUPLICATE",
          message: "Email Already Exist",
          error,
        });
        break;
      case "User_username_key":
        res.status(500).json({
          status: 500,
          statusText: "DUPLICATE",
          message: "Username Already Exist",
          error,
        });
        break;
      default:
        res.status(500).json({
          status: 500,
          statusText: "FAIL",
          message: "Internal Server Error",
          error,
        });
        break;
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        uuid: true,
        email: true,
        username: true,
        createdAt: true,
        number: true,
        conversations: true,
      },
    });

    res.status(200).json({ status: 200, statusText: "OK", users });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uuid: req.session.userid,
      },
      select: {
        uuid: true,
        email: true,
        username: true,
        createdAt: true,
        number: true,
        conversations: true,
      },
    });

    res.status(200).json({ status: 200, statusText: "OK", user });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        uuid: id,
      },
      select: {
        uuid: true,
        email: true,
        username: true,
        createdAt: true,
        number: true,
        conversations: true,
      },
    });

    res.status(200).json({ status: 200, statusText: "OK", user });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const deleteUserTable = async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`DELETE FROM User`;

    res.status(200).json({
      status: 200,
      statusText: "OK",
      message: "All Table Rows Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};
