import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    fullname: String,
    username: {
        type: String,
        unique: true
    },
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        requried: true
    }
})

export const User = mongoose.model('User', userSchema);
export const Account = mongoose.model('Account', accountSchema);
