import { CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import useRecordStore from '../../Store/useRecordStore';

const QuizResult = () => {
    const { id } = useParams();
    const { getRecordById, record } = useRecordStore();
    useEffect(() => {
        if (id) {
            getRecordById(id);
        }
    }, [id])
    return (
        <div className="min-h-[80vh] bg-secondary/25 text-black py-8 px-4 flex justify-center">
            <div className="bg-white rounded-md shadow-md p-8 w-[70%] relative">
                <div className='flex gap-2 absolute top-4 right-4 border-b-2'>
                    <p className='font-semibold text-primary'>Date :</p>
                    <p>{new Date(record?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <p>{new Date(record?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex justify-center mb-6">
                    <CheckCircle size={64} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-center mb-2">
                    Test Completed!
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    You've completed the {record?.testId?.title} test.
                </p>
                <div className="bg-accent/50 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Your Results</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-gray-500 text-sm">Score</p>
                            <p className="text-2xl font-bold">
                                {record?.score}/{record?.testId?.number}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-gray-500 text-sm">Percentage</p>
                            <p className="text-2xl font-bold">
                                {((record?.score / record?.testId?.number) * 100).toFixed(1)}%
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <p className="text-gray-500 text-sm">Complete Time</p>
                            <p className="text-2xl font-bold">
                                {record?.completeTime} {record?.completeTime > 1 ? 'minutes' : 'sec'}
                            </p>
                        </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${(record?.score / record?.testId?.number) >= 0.7
                                ? 'bg-green-500'
                                : (record?.score / record?.testId?.number) >= 0.4
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                            style={{
                                width: `${(record?.score / record?.testId?.number) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Detailed Answers</h2>
                    {record?.testId?.questions.map((question, index) => {
                        const userAnswer =
                            record?.answers[index] !== -1
                                ? question.options[record?.answers[index]]
                                : null;
                        const isCorrect = userAnswer === question.answer;
                        return (
                            <div key={index} className="mb-6 border p-4 rounded-md">
                                <h3 className="text-lg font-bold">
                                    {`Q${index + 1}: ${question.question}`}
                                </h3>
                                {question.description && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        Description: {question.description}
                                    </p>
                                )}
                                <p className="text-sm">
                                    Your Answer:{' '}
                                    {userAnswer ? (
                                        <span
                                            className={`font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {userAnswer}
                                        </span>
                                    ) : (
                                        <span className="font-bold text-gray-500">
                                            Not Answered
                                        </span>
                                    )}
                                </p>
                                <p className="text-sm">
                                    Correct Answer:{' '}
                                    <span className="font-bold text-green-600">
                                        {question.answer}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center">
                    <Link
                        to="/quiz"
                        className="px-6 py-2 bg-secondary text-white rounded-md  font-bold text-lg"
                    >
                        Return to Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default QuizResult