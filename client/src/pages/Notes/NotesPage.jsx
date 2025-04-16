import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Bot } from 'lucide-react';
import ShowNotes from '../../components/ShowNotes';
import useNotesStore from '../../Store/useNotesStroe';

function NotesPage() {
    const { createNotes, notesLoader, getAllNotes, notes } = useNotesStore();
    const [darkMode, setDarkMode] = useState(false);
    const [show, setShow] = useState("");
    const [prompt, setPrompt] = useState('');

    const generateNotes = async (e) => {
        e.preventDefault();
        createNotes({ topic: prompt });
        setPrompt('');
    };

    // Function to open the dialog
    function openDialog(note) {
        setShow(note._id, setShow)

        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
    
    useEffect(() => {
        getAllNotes();
    }, [])

    return (
        <div className={`min-h-[80vh] bg-secondary/25 px-6 py-4 `}>
            {show && <ShowNotes setShow={setShow} show={show} />}
            {/* Header */}

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-2 items-center mb-4 bg-white h-12 px-4 rounded-md shadow-md shadow-accent/50 "
            >
                <Bot className={`size-7 text-secondary`} />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                    AI Notes Generator
                </h1>
            </motion.div>
            {/* Input Section */}
            <motion.form
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-4 relative flex items-center inset-0 shadow-md shadow-accent/50"
            >
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your topic for notes generation..."
                    className="w-full px-4 py-3 rounded-lg border border-accent 
                       bg-white  text-gray-900
                       focus:ring-2 focus:ring-primary focus:border-none
                       transition-colors duration-200 outline-none"
                />
                <button
                    onClick={generateNotes}
                    disabled={notesLoader}
                    className={`absolute right-2 px-6 py-2 rounded-md flex items-center space-x-2 ${notesLoader ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} text-white transition-colors duration-200`}
                >
                    {notesLoader ? (
                        <Sparkles className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </motion.form>

            {/* Notes Display */}
            <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
            >
                {notes.map((note, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.5 }}
                        className={`p-4 rounded-md flex justify-between items-center bg-white border-l-4 border-primary shadow-md shadow-accent/50`}
                    >
                        <h1 className='text-lg font-bold'>{note.topic}</h1>
                        <button onClick={() => openDialog(note)} className='hover:border-b-2 hover:text-primary-400 hover:border-primary-400 duration-200' >View</button>
                    </motion.div>
                ))}
                {notes.length === 0 && (
                    <div className={`text-center py-12 col-span-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Sparkles className="w-12 h-12 mx-auto mb-4 animate-bounce-slow text-white" />
                        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Enter a topic to generate AI-powered notes!</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default NotesPage;