import { Request, Response } from "express";
import prisma from "../config/Db";

export const addConversation = async (req: Request, res: Response) => {
  const { receiver } = req.body;
  try {
    await prisma.conversation.create({
      data: {
        sender: req.session.user,
        receiver,
      },
    });

    res
      .status(200)
      .json({ status: 200, statusText: "OK", message: "Conversation Added" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const getConversation = async (req: Request, res: Response) => {
  const { receiver, sender } = req.body;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        receiver: receiver ? receiver : null,
        sender: sender ? sender : null,
      },
    });

    res.status(200).json({ status: 200, statusText: "OK", conversation });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    await prisma.conversation.delete({
      where: {
        uuid: req.session.conversation,
      },
    });

    res
      .status(200)
      .json({ status: 200, statusText: "OK", message: "Conversation Added" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "FAIL",
      message: "Internal Server Error",
      error,
    });
  }
};
