import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        playlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Playlist',
            },
        ],
        liked: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Likes',
            },
        ],
        role: {
            type: String,
            default: 'User',
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || 'dev_access_token_secret';

    return jwt.sign(
        {
            _id: this._id,
            fullname: this.fullname,
            email: this.email,
        },
        accessTokenSecret,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
        },
    );
};

userSchema.methods.generateRefreshToken = function () {
    const refreshTokenSecret =
        process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_token_secret';

    return jwt.sign(
        {
            _id: this._id,
        },
        refreshTokenSecret,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
        },
    );
};

const User = mongoose.model('User', userSchema);

export default User;
