import React, { useState } from 'react';
import { Brain, Code, FileText, GraduationCap, Settings, User, Trophy, TrendingUp, Download, Filter } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data - replace with real data later
const userData = {
  name: "John Doe",
  email: "john@example.com",
  joinDate: "March 2024",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
  stats: {
    quizzes: 15,
    codeProblems: 8,
    notes: 23
  },
  performance: {
    overallSuccess: 78,
    completionRate: 85,
    quizzesByTopic: {
      labels: ['Machine Learning', 'Data Structures', 'Algorithms', 'Web Dev', 'Database'],
      scores: [85, 72, 68, 90, 75]
    },
    codingProgress: {
      labels: ['Easy', 'Medium', 'Hard'],
      attempted: [20, 15, 5],
      solved: [18, 10, 2]
    },
    trendsData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      success: [65, 68, 70, 75, 78, 80]
    },
    achievements: [
      { name: 'Quick Learner', description: 'Completed 10 quizzes with 80%+ score', icon: '🚀' },
      { name: 'Code Warrior', description: 'Solved 20 coding challenges', icon: '⚔️' },
      { name: 'Knowledge Seeker', description: 'Created 25+ study notes', icon: '📚' }
    ]
  }
};

function ProfilePage() {
  const [timeFilter, setTimeFilter] = useState('all');

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Success Rate Trend' }
    }
  };

  const trendsData = {
    labels: userData.performance.trendsData.labels,
    datasets: [
      {
        label: 'Success Rate',
        data: userData.performance.trendsData.success,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const topicData = {
    labels: userData.performance.quizzesByTopic.labels,
    datasets: [
      {
        label: 'Score',
        data: userData.performance.quizzesByTopic.scores,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  };

  const codingData = {
    labels: userData.performance.codingProgress.labels,
    datasets: [
      {
        label: 'Attempted',
        data: userData.performance.codingProgress.attempted,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Solved',
        data: userData.performance.codingProgress.solved,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                  <p className="text-sm text-gray-400">Member since {userData.joinDate}</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-purple-500" />
                <h3 className="text-lg font-semibold">Quizzes</h3>
              </div>
              <span className="text-2xl font-bold text-purple-500">{userData.stats.quizzes}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-semibold">Code Problems</h3>
              </div>
              <span className="text-2xl font-bold text-blue-500">{userData.stats.codeProblems}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-green-500" />
                <h3 className="text-lg font-semibold">Notes</h3>
              </div>
              <span className="text-2xl font-bold text-green-500">{userData.stats.notes}</span>
            </div>
          </div>
        </div>

        {/* Performance Analysis Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Performance Analysis</h3>
            </div>
            <div className="flex space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="month">Last Month</option>
                <option value="week">Last Week</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Overall Progress</h4>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="text-2xl font-bold text-indigo-600">{userData.performance.overallSuccess}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold text-green-600">{userData.performance.completionRate}%</p>
                </div>
              </div>
              <div className="h-64">
                <Line options={lineChartOptions} data={trendsData} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Quiz Performance by Topic</h4>
              <div className="h-64">
                <Bar
                  data={topicData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: { display: false }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Coding Progress */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Coding Challenge Progress</h4>
            <div className="h-64">
              <Bar
                data={codingData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: false }
                  }
                }}
              />
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Achievements</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userData.performance.achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h5 className="font-semibold text-gray-900">{achievement.name}</h5>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'quiz', title: 'Machine Learning Basics', date: '2 hours ago', icon: GraduationCap, color: 'purple' },
              { type: 'code', title: 'Python Data Structures', date: '1 day ago', icon: Code, color: 'blue' },
              { type: 'note', title: 'Neural Networks Architecture', date: '3 days ago', icon: FileText, color: 'green' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-5 w-5 text-${item.color}-500`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">Created {item.date}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FileText className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;