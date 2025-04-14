import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Code, History, Sparkles } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const LandingPage = () => {
  const { authUser } = useAuthStore();

  const about = [
    {
      iocn: <Sparkles className="w-12 h-12 text-primary" />,
      title: "AI-Generated Quizzes",
      content: "Practice with personalized quizzes tailored to your learning goals and progress."
    },
    {
      iocn: <Code className="w-12 h-12 text-primary" />,
      title: "Code Challenge",
      content: "Enhance your programming skills with AI-curated coding problems and solutions."
    },
    {
      iocn: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Smart Study Notes Generator",
      content: "Generate comprehensive study notes that adapt to your learning style."
    }
  ]


  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <section className="flex flex-col items-center gap-2 sm:gap-4">
        <h1 className="text-3xl text-center font-extrabold tracking-tight text-base-content sm:text-5xl md:text-6xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary  to-accent ">Supercharge Your Learning with AI</span>
        </h1>
        <p className="w-full sm:w-[70%] text-center text-xl sm:text-2xl font-medium text-neutral">
          Transform your study experience with personalized quizzes, smart notes, and coding challenges powered by artificial intelligence.
        </p>
        <Link
          to={authUser ? "/quiz" : "/login"}
          className="flex items-center justify-center w-1/2 sm:w-[15%] px-8 py-2 bg-primary text-white rounded-md text-lg font-bold duration-500 hover:bg-secondary hover:text-white md:py-2 md:text-lg md:px-10"
        >
          {authUser ? "Dashboard" : "Get Started"}
        </Link>
      </section>

      <section className="mt-10 sm:mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
        {about.map((item) => (
          <div className="p-4 bg-white border-2 border-primary hover:bg-primary/20 text-neutral hover:text-white rounded-md duration-200 flex flex-col items-center gap-2">
            {item.iocn}
            <h3 className="text-xl font-bold text-accent">{item.title}</h3>
            <p className=" text-center font-semibold text-lg">
              {item.content}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose My AI Study?</h2>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-x-12 sm:gap-y-8 px-4">
          <BenefitItem text="Personalized learning experience" />
          <BenefitItem text="24/7 AI-powered assistance" />
          <BenefitItem text="Progress tracking and analytics" />
          <BenefitItem text="Regular content updates" />
        </div>
      </section>
    </div>
  );
};

function BenefitItem({ text }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
      <span className="text-lg text-neutral">{text}</span>
    </div>
  );
}

export default LandingPage;