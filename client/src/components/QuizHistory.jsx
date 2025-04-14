import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Eye, Calendar, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function QuizHistory({ record }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-white rounded-md shadow px-6 py-3"
        >
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-3xl font-bold text-gray-900 mb-4 text-center "
            >
                Quiz History
            </motion.h1>

            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/25 rounded-md">
                {record.length > 0 ? (
                    record.map((quiz, index) => (
                        <motion.div
                            key={quiz._id}
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: index + 3 }}
                            className="bg-white border-l-4 border-secondary rounded-md px-4 py-2 transition-all duration-200 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {quiz?.testId?.title}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${quiz?.testId?.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                                        quiz?.testId?.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {quiz?.testId?.level}
                                    </span>
                                </div>
                                <Link
                                    to={`/quiz_result/${quiz._id}`}
                                    className="font-bold hover:border-b-2 duration-200"
                                >
                                    View
                                </Link>
                            </div>

                            <div className="mt-3 flex items-center justify-between pr-6">
                                <div className="flex items-center text-gray-600">
                                    <Award className="w-5 h-5 mr-2 text-primary" />
                                    <span>Score: {quiz.score}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-5 h-5 mr-2 text-primary" />
                                    <span>{quiz?.completeTime} {quiz?.completeTime > 1 ? 'minutes' : 'sec'}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CircleCheck className="w-5 h-5 mr-2 text-primary" />
                                    <span>{quiz.score}/{quiz.testId?.number} Correct</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                                    <span>{new Date(quiz.createdAt).toLocaleDateString("en-GB")}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.p
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                        className="bg-white col-span-2 rounded-md shadow-md shadow-accent/50 p-6 text-center text-xl font-bold text-accent"
                    >
                        No tests history available. Generate your first test and Attempt!
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}

export default QuizHistory;