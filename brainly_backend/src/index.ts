declare global {
  namespace Express {
    interface Request {
      userId?: string | mongoose.Types.ObjectId;
    }
  }
}

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User Signed Up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists.",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD,
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials.",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  await ContentModel.create({
    link,
    type,
    title,
    // @ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({
    message: "Content Addded",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId as any,
  }).populate("userId", "username");
  res.json({
    content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    userId: req.userId as any,
  });

  res.json({
    message: " deleted ",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  const userId = new mongoose.Types.ObjectId(req.userId);
  if (share) {
    const existingLink = await LinkModel.findOne({ userId });
    const hash = random(10);
    if (!existingLink) {
      await LinkModel.create({
        userId,
        hash: hash,
      });
      res.json({
        message: "/share/" + hash,
      });
    }
    res.json({
      message: existingLink?.hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId,
    });
    res.json({
      message: "Removed Link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash,
  });
  if (!link) {
    res.status(411).json({ message: "Incorrect Input" });
    return;
  }
  const content = await ContentModel.find({
    userId: link?.userId,
  });
  const user = await UserModel.findOne({
    _id: link.userId,
  });
  if (!user) {
    res.status(411).json({
      message: "Something is wrong",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(3000);
