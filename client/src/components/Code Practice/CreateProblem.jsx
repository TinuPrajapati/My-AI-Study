import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import {  PROGRAMMING_LANGUAGES } from '../../data/problems.js';
import usePracticeStore from '../../Store/usePracticeStore.js';
import Input from '../Form/Input.jsx';
import Select from '../Form/Select.jsx';

export default function CreateProblem({ setShow }) {
    const { createProblem, isLoading } = usePracticeStore();
    const [form, setForm] = useState({
        topic: '',
        concept: '',
        level: '',
        language: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProblem(form);
        setShow(false);
    };

    return (
        <div className='fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-primary/40 flex justify-center items-center'>
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col w-[50%] h-[70%] p-4 rounded-md bg-white"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex items-center justify-between w-full px-4 h-[10%]">
                    <h1 className="text-3xl font-bold text-secondary">Create Problem</h1>
                    <button onClick={setShow}><X className='size-6 ' /></button>
                </motion.div>
                <form onSubmit={handleSubmit} className="h-[90%] flex flex-col justify-center gap-4">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}>
                        <Input text="Topic" id="topic" value={form.topic} change={handleChange} placeholder="Enter Topic Name" />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        <Select text="Level" id="level" value={form.level} change={handleChange} option={['Easy', 'Medium', 'Hard']} />
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        <Select text="Programming Language" id="language" value={form.language} change={handleChange} option={PROGRAMMING_LANGUAGES} />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary font-bold text-white px-6 py-2 rounded-md"
                        >
                            {isLoading ? (
                                <Sparkles className="w-5 h-5 animate-spin" />
                            ) : (
                                "Create Problem"
                            )}
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}