import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, Search, ChevronDown, ChevronUp, Clock, Trophy, AlertCircle, MessageCircle, Code } from 'lucide-react';
// import type { QuestionAttempt, HistoryFilters, SortCriteria } from '../types/history';
import ResponseSidebar from './ResponseSidebar.jsx';

const CodeHistory = ({ isOpen, onClose }) => {
    const [filters, setFilters] = useState({
        searchQuery: '',
        dateRange: { start: null, end: null },
        status: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
    });

    const [selectedResponse, setSelectedResponse] = useState(null);

    const [history, setHistory] = useState([
        {
            id: '1',
            questionText: 'What is the time complexity of QuickSort?',
            attemptedAt: new Date('2024-03-10T14:30:00'),
            userAnswer: 'O(n log n)',
            isCorrect: true,
            score: 10,
            timeSpent: 120,
            difficulty: 'Medium',
            responseMessage: 'Correct! QuickSort has an average time complexity of O(n log n). The partition operation takes O(n) time and is performed log n times on average.',
        },
        {
            id: '2',
            questionText: 'What is the difference between let and var in JavaScript?',
            attemptedAt: new Date('2024-03-09T10:15:00'),
            userAnswer: 'var is function scoped',
            isCorrect: false,
            score: 0,
            timeSpent: 90,
            difficulty: 'Easy',
            responseMessage: 'Not quite. While var is indeed function-scoped, the key difference is that let is block-scoped and cannot be redeclared within the same scope. Also, let does not get hoisted like var does.',
        },
    ]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    const handleSort = (criteria) => {
        setFilters(prev => ({
            ...prev,
            sortBy: criteria,
            sortOrder: prev.sortBy === criteria && prev.sortOrder === 'desc' ? 'asc' : 'desc',
        }));
    };

    const filteredHistory = history
        .filter(item => {
            const matchesSearch = item.questionText.toLowerCase().includes(filters.searchQuery.toLowerCase());
            const matchesStatus = filters.status === 'all' ||
                (filters.status === 'correct' && item.isCorrect) ||
                (filters.status === 'incorrect' && !item.isCorrect);
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const order = filters.sortOrder === 'desc' ? -1 : 1;
            switch (filters.sortBy) {
                case 'date':
                    return order * (b.attemptedAt.getTime() - a.attemptedAt.getTime());
                case 'score':
                    return order * (b.score - a.score);
                case 'difficulty':
                    return order * (a.difficulty.localeCompare(b.difficulty));
                case 'timeSpent':
                    return order * (a.timeSpent - b.timeSpent);
                default:
                    return 0;
            }
        });

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-40 w-[100vw] h-[100vh]">
                <div className="bg-white rounded-md w-[90%] h-[95%] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-secondary text-white rounded-t-md">
                        <h2 className="text-xl font-bold">Code Problem History</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-50/40 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="p-4 flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={filters.searchQuery}
                                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                            />
                        </div>
                        <select
                            className="border rounded-lg px-4 py-2"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="all">All Status</option>
                            <option value="correct">Correct</option>
                            <option value="incorrect">Incorrect</option>
                        </select>
                    </div>

                    {/* History List */}
                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-primary/80 text-white sticky top-0">
                                <tr>
                                    <th className="text-left p-4 font-semibold">Question</th>
                                    <th className="p-4 font-semibold cursor-pointer" onClick={() => handleSort('date')}>
                                        <div className="flex items-center gap-1">
                                            Date
                                            {filters.sortBy === 'date' && (
                                                filters.sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="p-4 font-semibold flex justify-center cursor-pointer" onClick={() => handleSort('score')}>
                                        <div className="flex items-center gap-1">
                                            Score
                                            {filters.sortBy === 'score' && (
                                                filters.sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="p-4 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((item) => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            <p className="font-semibold text-black">{item.questionText}</p>
                                            {item.responseMessage && (
                                                <div className="mt-2">
                                                    <button
                                                        onClick={() => setSelectedResponse({
                                                            message: item.responseMessage,
                                                            isCorrect: item.isCorrect
                                                        })}
                                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${item.isCorrect ? 'bg-green-200 text-green-700 hover:bg-green-100' : 'bg-red-200 text-red-700 hover:bg-red-100'}`}
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                        View Response
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            {item.attemptedAt.toLocaleDateString("en-Us", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center gap-1 justify-center">
                                                <Trophy className="w-4 h-4 text-yellow-500" />
                                                {item.score}
                                            </div>
                                            <div className="text-sm text-gray-500">{item.difficulty}</div>
                                        </td>
                                        <td className="p-4 flex items-center justify-center">
                                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm ${item.isCorrect
                                                ? 'bg-green-200 text-green-800'
                                                : 'bg-red-200 text-red-800'
                                                }`}>
                                                {item.isCorrect ? (
                                                    <>✓ Correct</>
                                                ) : (
                                                    <><AlertCircle className="w-4 h-4" /> Incorrect</>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ResponseSidebar
                isOpen={selectedResponse !== null}
                onClose={() => setSelectedResponse(null)}
                message={selectedResponse?.message || ''}
                isCorrect={selectedResponse?.isCorrect || false}
            />
        </>
    );
};

export default CodeHistory;