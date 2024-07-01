import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    semester: { 
        type: Number, 
        required: true,
    },
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
