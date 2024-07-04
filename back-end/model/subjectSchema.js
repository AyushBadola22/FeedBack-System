import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    subjectName: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    semester: {
      type: Number,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    }
  });
  
  const Subject = mongoose.model('Subject', subjectSchema);
  export default Subject;