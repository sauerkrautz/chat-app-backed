import { Request, Response } from "express";
import prisma from "../config/Db";

export const addMessage = async (req: Request, res: Response) => {
  try {
    await prisma.message.create({
      data: {
        conversationUuid: req.session.conversation,
        body: req.body.body,
      },
    });
    res.status(200).json({
      status: 200,
      statusText: "OK",
      message: "Message Sent Successfully",
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

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany();

    res.status(200).json({
      status: 200,
      statusText: "OK",
      messages,
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
