import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, History, Plus } from 'lucide-react';
import usePracticeStore from '../../Store/usePracticeStore';
import CodeHistory from '../../components/Code Practice/CodeHistory';
import CreateProblem from '../../components/Code Practice/CreateProblem';
import { closeDialog, openDialog } from '../../components/Component';

function CodePracticePage() {
  const [show, setShow] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { problems, getProblems } = usePracticeStore();
  const [topic, settopic] = useState('All');
  const [language, setlanguage] = useState('All');
  const [level, setlevel] = useState('All');

  const topics = Array.from(new Set(problems.map(problem => problem.topic)));
  const languages = Array.from(new Set(problems.map(problem => problem.language)));

  const filteredProblems = problems.filter(problem => {
    const topicMatch = topic === 'All' || problem.topic === topic;
    const languageMatch = language === 'All' || problem.language === language;
    const difficultyMatch = level === 'All' || problem.level === level;
    return topicMatch && languageMatch && difficultyMatch;
  });

  // function openDialog() {
  //   setShowHistory(true)
  //   // Disable body scroll
  //   document.body.style.overflow = 'hidden';
  // }

  // function closeDialog() {
  //   setShowHistory(false)
  //   // Enable body scroll
  //   document.body.style.overflow = 'auto';
  // }

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <div className="px-8 py-4 bg-secondary/25 min-h-[80vh]">
      {show && <CreateProblem setShow={() => closeDialog(setShow)} />}
      {showHistory && <CodeHistory onClose={() => closeDialog(setShowHistory)} isOpen={showHistory} />}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-between items-center mb-4 bg-white h-12 px-4 py-2 rounded-md shadow-md shadow-accent/50 "
      >
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <Bot className={`w-8 h-8 text-secondary`} />
          <h1 id="rock-salt" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Code Problems By AI
          </h1>
        </motion.div>
        <div className='flex items-center gap-2'>
          <button onClick={() => openDialog(setShow)} className='flex items-center gap-1 px-4 py-1 bg-secondary font-bold text-white rounded-md'>
            <Plus />
            <p>Create Problem</p>
          </button>
          <button
            // onClick={() => openDialog(setShowHistory)}
            className='flex items-center gap-1 px-4 py-1 bg-secondary font-bold text-white rounded-md'
          >
            <History />
            <p>View History</p>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white px-4 py-2.5 rounded-md shadow-md shadow-accent/50"
      >
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <label className="block text-primary text-lg pl-4 font-bold">Topic</label>
          <select
            className="w-full px-4 h-10 border-2 border-primary rounded-md outline-none focus:ring-2 focus:ring-accent focus:border-none text-black"
            value={topic}
            onChange={e => settopic(e.target.value)}
          >
            <option value="All">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <label className="block text-primary text-lg pl-4 font-bold">Language</label>
          <select
            className="w-full px-4 h-10 border-2 border-primary rounded-md outline-none focus:ring-2 focus:ring-accent focus:border-none text-black"
            value={language}
            onChange={e => setlanguage(e.target.value)}
          >
            <option value="All">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <label className="block text-primary text-lg pl-4 font-bold">Level</label>
          <select
            className="w-full px-4 h-10 border-2 border-primary rounded-md outline-none focus:ring-2 focus:ring-accent focus:border-none text-black"
            value={level}
            onChange={e => setlevel(e.target.value)}
          >
            <option value="All">All Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="w-full rounded-lg overflow-hidden shadow-lg">
        <div className='flex gap-2 items-center text-xl px-4 h-12 border-b border-secondary bg-primary text-white font-bold'>
          <p className="w-[10%] text-center ">Status</p>
          <p className="w-[60%] text-center ">Title</p>
          <p className="w-[10%] text-center">Topic</p>
          <p className="w-[10%] text-center">Language</p>
          <p className="w-[10%] text-center">Level</p>
        </div>
        {filteredProblems.map((problem, index) => (
          <motion.div
            key={index}
            className={`${index % 2 == 0 ? "bg-primary/40" : "bg-white"} flex gap-2 py-2 px-4`}
          >
            <p className="w-[10%] flex gap-2 items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            </p>
            <Link
              to={`/problem/${problem._id}`}
              className="text-neutral font-bold hover:text-blue-500 w-[60%]"
            >
              {problem.title}
            </Link>
            <p className="w-[10%] text-center text-black font-semibold">
              {problem.topic}
            </p>
            <p className="w-[10%] text-center text-black font-semibold">
              {problem.language.toUpperCase()}
            </p>
            <p className="w-[10%] text-center">
              <span className={`px-4 py-1 inline-flex leading-5 font-semibold rounded
                    ${problem.level === 'Easy' ? 'bg-green-100 text-green-800' :
                  problem.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                {problem.level}
              </span>
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default CodePracticePage;