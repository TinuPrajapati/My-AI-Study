import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, History } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const Home = () => {
  const { authUser } = useAuthStore();

  const about = [
    { iocn: <BookOpen className="w-12 h-12 mb-4 text-primary" />, title: "Interactive Tests", content: "Test your knowledge with our interactive quizzes and challenges. Answer multiple-choice questions and gain insights into the AI world." },
    { iocn: <BookOpen className="w-12 h-12 mb-4 text-primary" />, title: "Code Challenge", content: "Test your coding skills with our coding challenges. Solve coding problems and gain insights into the AI world." },
    { iocn: <BookOpen className="w-12 h-12 mb-4 text-primary" />, title: "Notes Generator", content: "Generate notes on AI topics with our notes generator. Stay up-to-date with the latest AI news and insights." },
  ]


  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-center font-extrabold tracking-tight text-base-content sm:text-5xl md:text-6xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary  to-accent ">Master Your AI Knowledge</span>
          <span className="block text-primary">With Interactive Tests</span>
        </h1>
        <p className="w-[70%] text-center text-2xl font-medium text-gray-800">
          Challenge yourself with our comprehensive AI tests. From machine
          learning basics to advanced neural networks.
        </p>
        <Link
          to={authUser ? "/quiz" : "/login"}
          className="flex items-center justify-center w-[15%] px-8 py-2 bg-primary text-white rounded-md text-lg font-bold duration-500 hover:bg-secondary hover:text-base-content md:py-2 md:text-lg md:px-10"
        >
          {authUser ? "Dashboard" : "Get Started"}
        </Link>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-extrabold text-center text-neutral">
          Why Choose AI Test Pro?
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          {about.map((item, index) => (
            <div className="p-6 bg-base-200 rounded-xl shadow-2xl hover:shadow-base-content duration-200">
              {item.iocn}
              <h3 className="mb-2 text-xl font-bold text-base-content">{item.title}</h3>
              <p className="text-base-content">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;