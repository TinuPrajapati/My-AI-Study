import React from 'react'
import { motion } from 'framer-motion';
import useNotesStore from '../Store/useNotesStroe';
import { Trash2, X } from 'lucide-react';

const ShowNotes = ({ setShow, show }) => {
    const { notes,deleteNote } = useNotesStore();
    const note = notes.filter((note) => note._id === show)[0];
    const handleNote = (id) => {
        setShow('');
        deleteNote(id)
    }
    return (
        <div className='fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-primary/40 flex justify-center items-center'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col w-[80%] h-[90%] p-4 rounded-md bg-white overflow-y-scroll"
            >
                <div className="flex items-center justify-between w-full px-4">
                    <h1 className="text-3xl font-bold text-secondary">{note?.topic}</h1>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => handleNote(note._id)}><Trash2 className='size-5 text-red-500' /></button>
                        <button onClick={() => setShow('')}><X className='size-6 ' /></button>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: note?.notes }} />
            </motion.div>
        </div>
    )
}

export default ShowNotes