import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Lightbulb } from 'lucide-react';
import usePracticeStore from '../../Store/usePracticeStore';
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from '../../components/ErrorAlert';

export default function ProblemPage() {
    const { id } = useParams();
    const { getSingleTest, problem, checkProblem, result } = usePracticeStore();
    console.log(result)
    const [code, setCode] = useState(problem?.function_signature);
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState(''); // 'success' or 'error'

    if (!problem) {
        return <div>Problem not found</div>;
    }

    const handleSubmit = () => {
        checkProblem({
            code: code,
            description: problem.description,
            function: problem.function_signature,
            testCase: problem.test_cases,
            topic: problem.topic,
            level: problem.level
        });
    };

    useEffect(() => {
        if (problem?.function_signature) {
            setCode(problem?.function_signature);
        }
    }, [problem]);

    useEffect(() => {
        getSingleTest(id);
    }, [id]);

    useEffect(() => {
        if (result) {
            setShow(true);
        }
    }, [result]);

    return (
        <div className="flex h-[80vh] bg-secondary/25 gap-2">
            {show && result?.status === "fail" ? <ErrorAlert result={result} onClose={setShow} /> : show && result?.status === "pass" ? <SuccessAlert onClose={setShow} result={result} /> : null}
            {/* Left Side */}
            <div className="w-1/2 p-4 h-full overflow-y-scroll">
                <motion.div
                    className='flex justify-between items-center mb-2 h-12 bg-white rounded-md px-4'
                >
                    <h1 className="text-2xl font-bold text-primary">{problem.title}</h1>
                    <span
                        className={`px-2 py-1 font-semibold rounded-md text-white ${problem.level === 'Easy' ? 'bg-green-500' : problem.level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    >
                        {problem.level}
                    </span>
                </motion.div>
                <motion.div className="bg-white p-2 rounded-md text-gray-800">
                    <p>{problem.description}</p>
                </motion.div>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Test Cases:</h3>
                    <div className="space-y-2">
                        {problem.test_cases?.map((testCase, index) => (
                            <div key={index} className="p-4 bg-white rounded-md">
                                <p className="text-secondary font-bold">INPUT: <span className='text-black font-normal'>{testCase.Input}</span></p>
                                <p className="text-accent font-bold">EXPECTED: <span className='text-black font-normal'>{testCase.Expected}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 flex flex-col">
                <div className=" p-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 hover:bg-green-700">
                            <Play className="h-4 w-4" />
                            <span>Run</span>
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-700">
                            <Lightbulb className="h-4 w-4" />
                            <span>Get Hint</span>
                        </button>
                    </div>
                    <p className='font-semibold text-primary bg-white px-4 py-1 rounded-md'>{problem?.language?.toUpperCase()}</p>
                </div>
                <Editor
                    height="calc(100vh - 28vh)"
                    language={`${problem.language}`}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}
