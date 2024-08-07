import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    sectionCode: { type: String, required: true },
    semester: { type: Number, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'
    }]
});

const Section = mongoose.model('Section', sectionSchema);
export default Section;
