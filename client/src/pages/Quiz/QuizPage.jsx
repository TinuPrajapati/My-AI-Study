import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, PlusCircle, CheckCircle2, Notebook } from 'lucide-react';
import { motion } from "framer-motion";
import useAuthStore from '../../Store/useAuthStore';
import useTestStore from '../../Store/useTestStore';
import useRecordStore from '../../Store/useRecordStore';
import GenerateTest from '../../components/GenerateTest';
import QuizHistory from '../../components/QuizHistory';

const QuizPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const { authUser } = useAuthStore();
  const { show, Tests } = useTestStore();
  const { records, allRecord } = useRecordStore();
  const [level, setLevel] = useState("All");
  const filterTestsByLevel = Tests.filter(problem => {
    const difficultyMatch = level === 'All' || problem.level === level;
    return difficultyMatch;
  });

  // Calculate stats
  const totalTestsTaken = records.length;
  const averageScore =
    totalTestsTaken > 0
      ? records.reduce(
        (sum, result) =>
          sum + ((result.score / result.testId?.number) * 100),
        0
      ) / totalTestsTaken
      : 0;

  useEffect(() => {
    show();
    allRecord();
  }, []);

  return (
    <div className="min-h-[80vh] bg-secondary/25 p-4 flex flex-col gap-4">
      {showForm && (
        <GenerateTest setShowForm={setShowForm} />
      )}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-white rounded-lg shadow-md shadow-accent/50 p-6"
      >
        <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent ">Welcome, {authUser?.name}!</h1>
        <p className="text-gray-600">
          Here's your personalized dashboard. Generate new tests or continue with your learning journey.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-white rounded-lg shadow-md shadow-accent/50 p-4 flex justify-between items-center"
        >
          <div className="flex items-center">
            <BookOpen size={24} className="text-primary mr-2" />
            <h2 className="text-xl font-semibold text-secondary">Available Tests</h2>
          </div>
          <p className="text-3xl font-bold text-accent">{Tests.length}</p>
        </motion.div>

        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="bg-white rounded-lg shadow-md shadow-accent/50 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <CheckCircle size={24} className="text-primary mr-2" />
            <h2 className="text-xl font-semibold text-secondary">Tests Completed</h2>
          </div>
          <p className="text-3xl font-bold text-accent">{records.length}</p>
        </motion.div>

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="bg-white rounded-lg shadow-md shadow-accent/50 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Clock size={24} className="text-primary mr-2" />
            <h2 className="text-xl font-semibold text-secondary">Average Score</h2>
          </div>
          <p className="text-3xl font-bold text-accent">{averageScore.toFixed(1)}%</p>
        </motion.div>
      </div>

      {/* Available Tests */}
      <div className="">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className='flex justify-between items-center mb-4 bg-white rounded-md shadow-md shadow-accent/50 py-2 px-4'>
          <h2 className="text-xl font-bold text-primary">Available Tests</h2>
          <div className='flex gap-4 items-center'>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center w-full md:w-auto px-6 py-1 border-2 border-secondary text-secondary font-bold text-lg rounded-md hover:bg-secondary hover:text-white transition-colors active:scale-90 duration-200"
            >
              <PlusCircle size={25} className="mr-2" />
              Generate New Test
            </button>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <select
                className="w-40 px-4 h-10 border-2 border-secondary rounded-md outline-none focus:ring-2 focus:ring-accent focus:border-none text-black"
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value="All">All Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {filterTestsByLevel.length === 0 ? (
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="bg-white rounded-md shadow-md shadow-accent/50 p-6 text-center text-xl font-bold text-accent"
          >
            No tests available. Generate your first test!
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Tests.map((test, index) => (
              <motion.div
                key={test._id}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: index + 2 }}
                className="bg-white rounded-md shadow-md shadow-accent/50 px-6 py-4 h-[50vh] flex flex-col gap-2"
              >
                <div className="flex items-start justify-between h-[15%]">
                  <h3 className="text-xl font-bold text-primary">
                    {test.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${test.level === "Beginner"
                      ? "bg-green-100 text-green-800"
                      : test.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {test.level}
                  </span>
                </div>
                <p className="mb-2 text-gray-600 h-[60%]">{test.description}</p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500 h-[10%]">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-accent" />
                    {test.duration} mins
                  </span>
                  <span className="flex items-center">
                    <Notebook className="w-4 h-4 mr-1 text-accent" />
                    {test.number} questions
                  </span>
                </div>
                <Link
                  to={`/test/${test._id}`}
                  onScroll={() => window.scrollTo(0, 0)}
                  className="w-[40%] h-[15%] py-1 text-white text-center transition-colors font-bold text-lg bg-accent rounded-md hover:bg-indigo-700"
                >
                  Start Test
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Test History */}
      <QuizHistory record={records} />
    </div>
  );
};

export default QuizPage;
