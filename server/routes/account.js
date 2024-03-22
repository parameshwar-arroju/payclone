import { Router } from "express";
import { Account } from "../db/schema.js";
import mongoose from "mongoose";
import userAuth from "../middleware/auth.js";

const AccountRoute = Router();

AccountRoute.get("/balance", userAuth, async (req, res) => {
	const userBalance = await Account.findOne({ userId: req.userId });
	res.status(200).json({ balance: userBalance.balance });
});

AccountRoute.post("/transfer", userAuth, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	const { amount, to } = req.body;
	const account = await Account.findOne({ userId: req.userId }).session(
		session
	);
	if (!account || account.balance < amount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "Insufficient balance",
		});
	}
	const toAccount = await Account.findOne({ userId: to }).session(session);
	if (!toAccount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "Invalid account",
		});
	}
	await Account.updateOne(
		{ userId: req.userId },
		{ $inc: { balance: -amount } }
	).session(session);
	await Account.updateOne(
		{ userId: to },
		{ $inc: { balance: amount } }
	).session(session);
	await session.commitTransaction();
	res.json({
		message: "Transfer successful",
	});
});

export default AccountRoute;
