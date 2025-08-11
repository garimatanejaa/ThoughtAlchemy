import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";
import {
  Lightbulb,
  Zap,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  Sparkles,
  Shuffle,
  Dna,
  LogOut,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import IdeaTransformation from "./IdeaTransformation";
import IdeaDNA from "./IdeaDNA";
import IdeaBlending from "./IdeaBlending";
import RecentActivity from "./RecentActivity"; // Import the new component
import IdeaEvolutionViewer from "./IdeaEvolutionViewer";

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  useEffect(() => {
    setLoadingRecent(true);
    api
      .get("/ideas/recent?limit=4")
      .then((res) => {
        setRecentIdeas(res.data); // make sure your API returns an array
      })
      .catch((err) => {
        console.error("Error fetching recent ideas:", err);
      })
      .finally(() => setLoadingRecent(false));
  }, []);
  

  // New recent activity data with prompts & tags
  const [recentActivity] = useState([
    {
      id: 1,
      prompt:
        "Build an AI-powered meditation app that helps users relax deeply with adaptive soundscapes",
      tags: ["AI", "Meditation", "App"],
    },
    {
      id: 2,
      prompt:
        "Create sustainable packaging solutions for eco-friendly brands to reduce plastic waste",
      tags: ["Sustainability", "Packaging", "Eco-friendly"],
    },
    {
      id: 3,
      prompt:
        "Design a virtual reality fitness game that motivates players to exercise daily",
      tags: ["VR", "Fitness", "Game"],
    },
  ]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    console.log("Logging out...");
    navigate("/login");
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      description: "Overview",
    },
    {
      id: "transform",
      label: "Idea Transformation",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Transform concepts",
    },
    {
      id: "blend",
      label: "Idea Blending",
      icon: <Shuffle className="w-5 h-5" />,
      description: "Merge ideas",
    },
    {
      id: "dna",
      label: "Idea DNA Viewer",
      icon: <Dna className="w-5 h-5" />,
      description: "Analyze structure",
    },
    {
      id: "history", // New tab for recent activity
      label: "Recent Activity",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Your latest prompts & history",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Transform Ideas",
      description: "Convert your thoughts into actionable concepts",
      action: () => setActiveTab("transform"),
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Blend Concepts",
      description: "Merge multiple ideas into innovative solutions",
      action: () => setActiveTab("blend"),
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Explore DNA",
      description: "Deep dive into your idea's core structure",
      action: () => setActiveTab("dna"),
      color: "from-purple-500 to-pink-400",
    },
  ];

  const stats = [
    {
      label: "Ideas Created",
      value: "24",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      label: "Transformations",
      value: "8",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      label: "Success Rate",
      value: "87%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Sidebar */}
      <nav className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-lg relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent opacity-50 pointer-events-none"></div>

        {/* Logo Section */}
        <div className="relative px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ThoughtAlchemy</h1>
              <p className="text-purple-200 text-sm">Transform Ideas to Gold</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="relative flex-grow px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105"
                      : "hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`transition-colors duration-200 ${
                        activeTab === item.id
                          ? "text-white"
                          : "text-gray-500 group-hover:text-purple-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div
                        className={`text-xs ${
                          activeTab === item.id ? "text-purple-100" : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="relative px-4 pb-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden">
        {activeTab === "dashboard" ? (
          <div className="flex-grow p-8 overflow-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome to ThoughtAlchemy ✨
              </h1>
              <p className="text-gray-600 text-lg">
                Transform your ideas into gold. Where creativity meets innovation.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className="text-purple-500 bg-purple-50 p-3 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={feature.action}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Recent Ideas (existing) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="px-6 py-4 border-b border-gray-200 flex items-center">
    <Clock className="w-5 h-5 text-purple-500 mr-2" />
    <h2 className="text-lg font-semibold text-gray-800">Recent Ideas</h2>
  </div>
  <div className="p-6">
    {loadingRecent ? (
      <p className="text-gray-500">Loading...</p>
    ) : recentIdeas.length > 0 ? (
      <ul className="space-y-4">
        {recentIdeas.map((idea) => (
          <li
            key={idea._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
              <div>
                <p className="text-gray-800 font-medium">
                  {idea.originalText.length > 80 
                    ? idea.originalText.substring(0, 80) + "..." 
                    : idea.originalText}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {idea.transformationType}
                  </span>
                  <p className="text-gray-500 text-sm">
                    {new Date(idea.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors" />
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-center py-12 text-gray-500">
        <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg">No ideas yet. Start your creative journey!</p>
      </div>
    )}
  </div>
</div>
          </div>
        ) : activeTab === "transform" ? (
          <div className="flex-grow p-8 overflow-auto bg-gray-50">
            <IdeaTransformation />
          </div>
        ) : activeTab === "blend" ? (
          <div className="flex-grow p-8 overflow-auto bg-gray-50">
            <IdeaBlending />
          </div>
        ) : activeTab === "dna" ? (
          <div className="flex-grow p-8 overflow-auto bg-gray-50">
            <IdeaEvolutionViewer />
          </div>
        ) : activeTab === "history" ? (
          <RecentActivity recentActivity={recentActivity} />
        ) : null}
      </main>

      {/* Enhanced Quick Actions Sidebar */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-auto shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 text-purple-500 mr-2" />
          Quick Actions
        </h3>

        <div className="space-y-4">
          <button
            onClick={() => setActiveTab("transform")}
            className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-all hover:scale-105"
          >
            <div className="flex items-center mb-2">
              <Lightbulb className="w-4 h-4 text-purple-600 mr-2" />
              <span className="font-medium text-purple-700">New Idea</span>
            </div>
            <p className="text-sm text-gray-600">Start transforming a fresh concept</p>
          </button>

          <button
            onClick={() => setActiveTab("blend")}
            className="w-full p-4 text-left bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all hover:scale-105"
          >
            <div className="flex items-center mb-2">
              <Users className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-medium text-green-700">Blend Ideas</span>
            </div>
            <p className="text-sm text-gray-600">Combine existing concepts</p>
          </button>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3">Daily Inspiration</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800 italic font-medium">
                  "Creativity is intelligence having fun."
                </p>
                <p className="text-xs text-yellow-600 mt-1">- Albert Einstein</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                <p className="text-sm text-pink-800 italic font-medium">
                  "Innovation distinguishes between a leader and a follower."
                </p>
                <p className="text-xs text-pink-600 mt-1">- Steve Jobs</p>
              </div>

              <div class="p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl border border-purple-200">
    <p class="text-sm text-purple-800 italic font-medium">
      "Believe you can and you're halfway there."
    </p>
    <p class="text-xs text-purple-600 mt-1">- Theodore Roosevelt</p>
  </div>

  <div class="p-4 bg-gradient-to-r from-green-50 to-lime-50 rounded-xl border border-green-200">
    <p class="text-sm text-green-800 italic font-medium">
      "The journey of a thousand miles begins with a single step."
    </p>
    <p class="text-xs text-green-600 mt-1">- Lao Tzu</p>
  </div>
            </div>
          </div>

          {/* <div className="pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Today's Progress</h4>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
              <p className="text-sm text-indigo-800 mb-3 font-medium">
                🎯 <strong>Daily Goal:</strong> Transform 3 ideas
              </p>
              <div className="w-full bg-indigo-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: "66%" }}
                ></div>
              </div>
              <p className="text-xs text-indigo-600 mt-2 font-medium">2 of 3 completed - Keep going! 🚀</p>
            </div>
          </div> */}
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;




