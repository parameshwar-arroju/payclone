import { Router } from "express";
import { Account, User } from "../db/schema.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userAuth from "../middleware/auth.js";

const UserRoute = Router();
const JWT = process.env.JWT_SECRET;

UserRoute.post("/signup", async (req, res) => {
	const userinfo = z.object({
		username: z.string(),
		fullname: z.string(),
		password: z.string(),
	});
	const verify = userinfo.safeParse(req.body);
	if (!verify.success)
		return res.status(400).json({ msg: "zod verification failed" });
	const userExist = await User.findOne({ username: req.body.username });
	if (userExist) return res.status(409).json({ msg: "User already exist" });
	const hash = await bcrypt.hash(req.body.password, 13);
	req.body.password = hash;
	const user = await User.create(req.body);
	await Account.create({
		userId: user._id,
		balance: 1 + Math.random() * 10000,
	});
	const token = jwt.sign({ userId: user._id }, JWT);
	res.status(200).json({
		token: token,
		msg: "user created sucessfully",
		username: user.username,
	});
});

UserRoute.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	const userExist = await User.findOne({ username });
	if (!userExist) return res.status(409).json({ msg: "User doesn't exist" });
	const verify = bcrypt.compare(password, userExist.password);
	if (!verify)
		return res.status(409).json({ msg: "invalid username/password" });
	const token = jwt.sign({ userId: userExist._id }, JWT);
	res.status(200).json({
		msg: "signin sucessfull",
		token: token,
		username: userExist.username,
	});
});

UserRoute.put("/", userAuth, async (req, res) => {
	const updateBody = z.object({
		password: z.string().optional(),
		fullname: z.string().optional(),
	});
	const { success } = updateBody.safeParse(req.body);
	if (!success) {
		res.status(411).json({
			message: "Error while updating information",
		});
	}
	if (req.body.password) {
		const updatedPassword = await bcrypt.hash(req.body.password, 13);
		req.body.password = updatedPassword;
	}
	await User.updateOne({ _id: req.userId }, req.body);

	res.json({
		message: "Updated successfully",
	});
});

UserRoute.get("/bulk", userAuth, async (req, res) => {
	const filter = req.query.filter || "";
	const users = await User.find({
		_id: {
			$ne: req.userId,
		},
		$or: [
			{
				fullname: {
					$regex: filter,
					$options: "i",
				},
			},
			{
				username: {
					$regex: filter,
					$options: "i",
				},
			},
		],
	});
	res.status(200).json({
		users: users.map((user) => ({
			username: user.username,
			fullname: user.fullname,
			userid: user._id,
		})),
	});
});

UserRoute.get("/profile", userAuth, async (req, res) => {
	const userInfo = await User.findOne({ _id: req.userId });
	if (!userInfo) return res.status(404).json({ msg: "User Not Fount" });
	else res.status(200).json({ user: userInfo });
});

export default UserRoute;
