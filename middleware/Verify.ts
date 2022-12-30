import { Request, Response, NextFunction } from "express";
import prisma from "../config/Db";

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userid)
    return res.status(401).json({
      status: 401,
      statusText: "UNAUTHORIZED",
      message: "Please Login To Your Account",
    });

  const user = await prisma.user.findUnique({
    where: {
      uuid: req.session.userid,
    },
    select: {
      uuid: true,
      email: true,
      username: true,
      number: true,
      createdAt: true,
      UpdatedAt: true,
      conversations: {
        where: {
          sender: req.session.userid,
        },
      },
    },
  });

  if (!user)
    return res.status(404).json({
      status: 404,
      statusText: "NOT FOUND",
      message: "User Not Found",
    });

  req.session.user = user;
  next();
};

// export const verifyConversation = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session.user) {
//     return next();
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       uuid: req.session.user.uuid,
//     },
//     include: {
//       conversations: true,
//     },
//   });

//   if (!user)
//     return res
//       .status(404)
//       .json({
//         status: 400,
//         statusText: "NOT FOUND",
//         message: "User Not Found",
//       });

//   const conversation = await prisma.conversation.findUnique({
//     where: {
//       uuid: user.conversations.
//     },
//     select: {
//       uuid: true,
//       sender: true,
//       receiver: true,
//     },
//   });

//   if (!conversation)
//     return res.status(404).json({
//       status: 404,
//       statusText: "NOT FOUND",
//       message: "Conversation Not Found",
//     });

//   req.session.conversation = conversation.uuid;
//   req.session.receiver = conversation.receiver;

//   next();
// };
