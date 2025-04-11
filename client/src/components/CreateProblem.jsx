import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { PROBLEM_TOPICS, PROGRAMMING_LANGUAGES, problems } from '../data/problems.js';
import usePracticeStore from '../Store/usePracticeStore.js';

export default function CreateProblem({ setShow }) {
    const { createProblem, isLoading } = usePracticeStore();
    const [form, setForm] = useState({
        topic: '',
        concept: '',
        level: '',
        language: ''
    });

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
                    <button onClick={() => setShow(false)}><X className='size-6 ' /></button>
                </motion.div>
                <form onSubmit={handleSubmit} className="h-[90%] flex flex-col justify-center gap-4">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}>
                        <label className="block text-gray-700 pl-4 font-bold">Topic</label>
                        <input
                            type="text"
                            className="w-full px-4 h-10 border-2 text-gray-900 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                            value={form.topic}
                            placeholder='Enter Topic Name'
                            onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        <label className="block text-gray-700 pl-4 font-bold">Level</label>
                        <select
                            className="w-full px-4 h-10 text-gray-900 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                            value={form.level}
                            onChange={e => setForm(prev => ({ ...prev, level: e.target.value }))}
                        >
                            <option value="">Choose Level</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        <label className="block text-gray-700 pl-4 font-bold">Programming Language</label>
                        <select
                            className="w-full px-4 h-10 text-gray-900 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary-400 focus:border-none"
                            value={form.language}
                            onChange={e => setForm(prev => ({ ...prev, language: e.target.value }))}
                        >
                            <option value="">Choose Language </option>
                            {PROGRAMMING_LANGUAGES.map(lang => (
                                <option key={lang} value={lang.toLocaleLowerCase()}>{lang}</option>
                            ))}
                        </select>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-accent font-bold text-white px-6 py-2 rounded-md"
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