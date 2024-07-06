import Teacher from '../model/teacherModel.js'
import Section from '../model/sectionModel.js'
import Subject from '../model/subjectSchema.js';
import mongoose from 'mongoose';

const generateUID = async () => {
    const now = new Date();

    const prefix = '30';
    const day = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear()).slice(2);
    const hour = String(now.getHours()).padStart(2, '0');
    let uid = Number(prefix + year + day + hour);

    let isUnique = false;

    while (!isUnique) {
        const existingDoc = await Teacher.findOne({ uid });
        if (!existingDoc) {
            isUnique = true;
        } else {
            uid += 7;
            if (uid >= 40000000) {
                uid = 30000000 + (uid % 40000000);
            }
        }
    }
    return uid;
}

export const createTeacher = async (req, res) => {
    console.log("creating teacher user");
    const { name, email, password, subjectID, sections } = req.body;

    sections.map((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Section ID format " });
        }
    })

    if (!mongoose.Types.ObjectId.isValid(subjectID)) {
        return res.status(400).json({ message: "Invalid Subject ID format " });
    }

    try {

        const existingTeacher = await Teacher.findOne({ name, email });
        if (existingTeacher) {
            res.status(200).json({ message: "This email already exists." });
            return;
        }

        const subject = await Subject.findById(subjectID);
        if (!subject) return res.status(400).json({ message: "Subject Doesn't exist" });

        let sectionData = []

        for (const id of sections) {
            const section = await Section.findById(id);
            if (section) {
                sectionData.push({
                    name: section.sectionCode,
                    id: section._id
                });
            }
        }
        console.log(sections);

        let subjectData = {
            name: subject.subjectName,
            id: subject._id
        }

        const uid = await generateUID();
        const newTeacher = new Teacher({
            name, uid, email, password,
            section: sectionData,
            subject : subjectData
        });
        await newTeacher.save();
        res.status(200).json({message : "Teacher Created", data : newTeacher}); 
    }
    catch (error) {
        res.status(501).send('Error creating user : ' + error.message)
    }
};
