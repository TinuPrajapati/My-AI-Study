import { Loader2, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";
import useTestStore from "../Store/useTestStore";

const GenerateTest = ({setShowForm}) => {
    const {generate, isLoading,} = useTestStore();
    const [generatorSettings, setGeneratorSettings] = useState(
        {
            topic: "",
            level: "Beginner",
            number: 5,
            duration: 10,
        }
    );
    const handleGenerateTest = (e) => {
        e.preventDefault();
        generate(generatorSettings,setShowForm);
      };
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-sky-400/40 flex justify-center items-center">
            <div className="w-[40%] h-[90%] bg-white shadow-lg rounded-md py-4">
                <div className="flex items-center justify-between gap-3 border-b-2 border-sky-400 px-8 pb-2 h-[10%]">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-secondary" />
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Generate Custom Test
                        </h2>
                    </div>
                    <button onClick={() => setShowForm(false)}><X className="w-8 h-8 text-black" /></button>
                </div>

                <form onSubmit={handleGenerateTest} className=" px-8 flex flex-col justify-between h-[90%] pt-4">
                    <div>
                        <label
                            htmlFor="topic"
                            className="block text-[1rem] font-semibold pl-2 text-gray-700"
                        >
                            Topic
                        </label>
                        <input
                            id="topic"
                            value={generatorSettings.topic}
                            onChange={(e) =>
                                setGeneratorSettings({
                                    ...generatorSettings,
                                    topic: e.target.value,
                                })
                            }
                            placeholder="Enter Topic for test"
                            className="block w-full px-4 py-1 text-[1rem] text-gray-900 h-10 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="level"
                            className="block text-[1rem] font-semibold pl-2 text-gray-700"
                        >
                            Difficulty Level
                        </label>
                        <select
                            id="level"
                            value={generatorSettings.level}
                            onChange={(e) =>
                                setGeneratorSettings({
                                    ...generatorSettings,
                                    level: e.target.value
                                })
                            }
                            className="block w-full px-4 py-1 text-gray-900 text-[1rem] h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="number"
                            className="block text-[1rem] font-semibold pl-2 text-gray-700"
                        >
                            Number of Questions
                        </label>
                        <input
                            type="number"
                            id="number"
                            min="5"
                            max="30"
                            value={generatorSettings.number}
                            onChange={(e) =>
                                setGeneratorSettings({
                                    ...generatorSettings,
                                    number: parseInt(e.target.value),
                                })
                            }
                            className="block w-full px-4 py-1 text-[1rem] text-gray-900 h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="duration"
                            className="block text-[1rem] font-semibold pl-2 text-gray-700"
                        >
                            Test Duration (minutes)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            min="5"
                            max="30"
                            value={generatorSettings.duration}
                            onChange={(e) =>
                                setGeneratorSettings({
                                    ...generatorSettings,
                                    duration: parseInt(e.target.value),
                                })
                            }
                            className="block w-full px-4 py-1 text-[1rem] text-gray-900 h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-2 px-4 rounded-md flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Generating Test...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 mr-2" />
                                Generate Test
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GenerateTest;
