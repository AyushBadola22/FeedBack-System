import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    section: {
        code: { type: String, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }
    },
    course: {
        name: { type: String, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
    },
    semester: {
        type: Number,
        default: 1
    },
    yearOfJoining : {
        type : Number , 
        required : true
    },
    feedbackGiven: {
        status : {type : Boolean , default : false}, 
        id : {type : mongoose.Schema.Types.ObjectId , ref : 'Feedback'}
    }, 
    role : {
        type : String , 
        default : "student" 
    }
});

studentSchema.pre('save', async function (next) {
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

studentSchema.methods.generateToken = async function () {

    try {
        return jwt.sign(
            {
                id: this._id.toString(),
                role: this.role ,
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

const Student = mongoose.model('Student', studentSchema);
export default Student;