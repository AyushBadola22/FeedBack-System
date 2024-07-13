import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    interactivity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    engagement: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    clarity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    preparedness: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    fairness: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    availability: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['submitted', 'reported'],
        default: 'submitted'
    }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
