import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        required: true,
        default: 'admin'
    }
});

adminSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.generateToken = async function () {

    try {

        return jwt.sign(
            {
                id: this._id.toString(),
                role: this.role,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d"
            }
        )
    } catch (error) {
        console.log(error.message);
    }
}

const Admin = mongoose.model('Admin', adminSchema);
export default Admin; 
