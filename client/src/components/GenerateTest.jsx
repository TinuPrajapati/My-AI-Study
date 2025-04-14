import { Loader2, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";
import useTestStore from "../Store/useTestStore";
import { motion } from "framer-motion";
import Input from "./Form/Input";
import Select from "./Form/Select";
import Number from "./Form/Number";

const GenerateTest = ({ setShowForm }) => {
    const { generate, isLoading, } = useTestStore();
    const [formData, setFormData] = useState(
        {
            topic: "",
            level: "Beginner",
            number: 5,
            duration: 10,
        }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleGenerateTest = (e) => {
        e.preventDefault();
        generate(formData, setShowForm);
    };
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-sky-400/40 flex justify-center items-center">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-[40%] h-[90%] bg-white shadow-lg rounded-md py-4"
            >
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex items-center justify-between gap-3 border-b-2 border-sky-400 px-8 pb-2 h-[10%]"
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-secondary" />
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Generate Custom Test
                        </h2>
                    </div>
                    <button onClick={() => setShowForm(false)}><X className="w-8 h-8 text-black" /></button>
                </motion.div>

                <form onSubmit={handleGenerateTest} className=" px-8 flex flex-col justify-between h-[90%] pt-4">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}>
                        <Input text="Topic" id="topic" value={formData.topic} change={handleChange} placeholder="Enter Topic for test" />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.8 }}
                    >
                        <Select text="Level" id="level" value={formData.level} change={handleChange} option={['Beginner', 'Intermediate', 'Advanced']} />
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2.2 }}
                    >
                        <Number text="Number of Questions" id="number" value={formData.number} change={handleChange} max="30" min="5" />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2.6 }}
                    >
                        <Number text="Test Duration (minutes)" id="duration" value={formData.duration} change={handleChange} max="30" min="5" />
                    </motion.div>

                    <motion.button
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 3 }}
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-2 px-4 rounded-md flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                Generating Test...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 mr-2" />
                                Generate Test
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div >
    );
};

export default GenerateTest;
