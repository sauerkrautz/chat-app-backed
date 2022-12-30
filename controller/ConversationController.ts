import { Conversation, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../config/Db";

// const findDuplicateConversation = async (
//   receiver: string,
//   req?: Request,
//   res?: Response
// ) => {
//   try {
//     const conversation = await prisma.conversation.findUnique({
//       where: {
//         sender: receiver,
//       },
//     });
//     if (conversation) return true;
//     return null;
//   } catch (error) {
//     console.log({ error });
//     return null;
//   }
// };

export const addConversation = async (req: Request, res: Response) => {
  const { receiver, email, username } = req.body;

  let user;

  if (email !== null || email !== undefined) {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        uuid: true,
      },
    });
  } else if (username !== null || username !== undefined) {
    user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        uuid: true,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        uuid: receiver,
      },
      select: {
        uuid: true,
      },
    });
  }

  if (!user)
    return res.status(404).json({
      status: 404,
      statusText: "NOT FOUND",
      message: "User Not Found",
    });

  try {
    const sender = prisma.conversation.create({
      data: {
        sender: req.session.user.uuid,
        receiver: user.uuid,
      },
    });

    const receiver = prisma.conversation.create({
      data: {
        sender: user.uuid,
        receiver: req.session.user.uuid,
      },
    });

    await sender;
    await receiver;

    res
      .status(200)
      .json({ status: 200, statusText: "OK", message: "Conversation Added" });
  } catch (error: any) {
    switch (error.meta.target) {
      case "Conversation_sender_key":
        res.status(500).json({
          status: 500,
          statusText: "DUPLICATE",
          message: "Conversation Already Exist",
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

export const getConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        sender: req.session.user.uuid,
      },
      include: {
        user: {
          select: {
            uuid: true,
            email: true,
            username: true,
            number: true,
            createdAt: true,
            UpdatedAt: true,
          },
        },
      },
    });

    // const Conversations = async () => {
    //   return await conversations.map(async (e: any, i: number) => {
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         uuid: e.receiver,
    //       },
    //       select: {
    //         uuid: true,
    //         email: true,
    //         username: true,
    //         number: true,
    //         createdAt: true,
    //         UpdatedAt: true,
    //       },
    //     });

    //     console.log({ conversations, user });

    //     return { ...conversations[i], receiver: user };
    //   });
    // };

    // console.log({ Conversations: Conversations() });

    res.status(200).json({ status: 200, statusText: "OK", conversations });
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
  const { id } = req.params;
  try {
    const conversation = prisma.conversation.findUnique({
      where: {
        sender_receiver: { sender: req.session.user.uuid, receiver: id },
      },
      include: {
        messages: true,
        user: {
          select: {
            uuid: true,
            email: true,
            username: true,
          },
        },
      },
    });

    const receiver = prisma.user.findUnique({
      where: {
        uuid: id,
      },
      select: {
        email: true,
        username: true,
      },
    });

    res.status(200).json({
      status: 200,
      statusText: "OK",
      conversation: {
        conversation: await conversation,
        receiver: await receiver,
      },
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
