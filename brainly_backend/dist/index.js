"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password,
        });
        res.json({
            message: "User Signed Up",
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists.",
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.UserModel.findOne({
        username,
        password,
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials.",
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await db_1.ContentModel.create({
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
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({
        content,
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await db_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId,
    });
    res.json({
        message: " deleted ",
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    const userId = new mongoose_1.default.Types.ObjectId(req.userId);
    if (share) {
        const existingLink = await db_1.LinkModel.findOne({ userId });
        const hash = (0, utils_1.random)(10);
        if (!existingLink) {
            await db_1.LinkModel.create({
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
    }
    else {
        await db_1.LinkModel.deleteOne({
            userId,
        });
        res.json({
            message: "Removed Link",
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.LinkModel.findOne({
        hash,
    });
    if (!link) {
        res.status(411).json({ message: "Incorrect Input" });
        return;
    }
    const content = await db_1.ContentModel.find({
        userId: link?.userId,
    });
    const user = await db_1.UserModel.findOne({
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
//# sourceMappingURL=index.js.map