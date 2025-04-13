import Notes from "../models/notesModel.js";
import GenerateNotes from "../utils/generateNotes.js";

const createNote = async (req, res) => {
    try {
        const {userId} = req.user;
        const {topic} = req.body;
        const notes = await GenerateNotes(topic);
        const note = await new Notes({user: userId, topic, notes});
        note.save();
        res.status(201).json({ message: "Note Create Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log("Error come in createNote route:", error);
    }
};

const getAllNotes = async (req, res) => {
    try{
        const {userId} = req.user;
        const notes = await Notes.find({user: userId});
        res.status(200).json({notes});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log("Error come in getAllNotes route:", error);
    }
};

const deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Notes.findByIdAndDelete(id);
        res.status(200).json({message:"Note Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log("Error come in deleteNote route:", error);
    }
};

export {
    createNote,
    getAllNotes,
    deleteNote
}