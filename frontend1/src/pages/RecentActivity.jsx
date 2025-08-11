import React, { useState, useEffect } from "react";
import {
  Clock,
  Zap,
  Shuffle,
  Sparkles,
  BarChart3,
  ArrowRight,
  Eye,
  Calendar,
  Activity,
  Lightbulb,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

const RecentActivity = ({ limit = 5 }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const token = localStorage.getItem("token");

  const truncateText = (text, maxLength = 80) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "pitch":
        return <Zap className="w-4 h-4" />;
      case "poem":
        return <Sparkles className="w-4 h-4" />;
      case "plan":
        return <BarChart3 className="w-4 h-4" />;
      case "blend":
        return <Shuffle className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "pitch":
        return "from-blue-500 to-cyan-400";
      case "poem":
        return "from-pink-500 to-rose-400";
      case "plan":
        return "from-green-500 to-emerald-400";
      case "blend":
        return "from-purple-500 to-indigo-400";
      default:
        return "from-gray-500 to-slate-400";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const fetchRecentActivity = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/user/ideas", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recent activity: ${response.statusText}`);
      }

      const data = await response.json();

      const sortedIdeas = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

      setActivities(sortedIdeas);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recent activity:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, [token, limit]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex-grow p-4 overflow-auto max-h-[400px]">
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <RefreshCw className="w-6 h-6 text-purple-500 animate-spin mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Loading recent activity...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow p-8 overflow-auto max-h-[800px] max-w-[800px]">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Activity className="w-6 h-6 text-purple-600 mr-2" />
          Recent Activity
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center text-sm">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-red-500 text-lg">⚠</span>
          </div>
          <p className="text-red-700 font-medium mb-1">Unable to load recent activity</p>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchRecentActivity}
            className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
          <Activity className="w-6 h-6 text-purple-600 mr-2" />
          Recent Activity
        </h2>
        <button
          onClick={fetchRecentActivity}
          className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-500 text-base font-medium mb-1">No recent activity found</p>
            <p className="text-gray-400 text-sm">Start creating ideas to see your activity here!</p>
          </div>
        ) : (
          activities.map((activity) => {
            const isExpanded = expandedIds.has(activity._id);
            return (
              <div
                key={activity._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
              >
                {/* Activity Header */}
                <div className={`p-3 bg-gradient-to-r ${getTypeColor(activity.transformationType)} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        {getTypeIcon(activity.transformationType)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-md capitalize">
                          {activity.transformationType === "blend"
                            ? `Blended with "${activity.blendedWith || "another idea"}"`
                            : `${activity.transformationType} Creation`}
                        </h3>
                        <p className="text-xs opacity-90">{formatDate(activity.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold backdrop-blur-sm">
                        {activity.transformationType.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Original Idea */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center text-xs uppercase tracking-wide">
                        <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-1 text-xs font-bold">
                          O
                        </div>
                        Original Idea
                      </h4>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="text-gray-800 text-xs leading-relaxed">
                          {isExpanded ? activity.originalText : truncateText(activity.originalText, 80)}
                        </p>
                      </div>
                    </div>

                    {/* Evolution Arrow */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>

                    {/* Transformed Idea */}
                    <div className="space-y-2 lg:col-start-2">
                      <h4 className="font-semibold text-gray-800 flex items-center text-xs uppercase tracking-wide">
                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-1 text-xs font-bold">
                          E
                        </div>
                        Evolution Result
                      </h4>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-gray-800 text-xs leading-relaxed">
                          {isExpanded ? activity.transformedText : truncateText(activity.transformedText, 80)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Footer */}
                  <div className="mt-4 pt-2 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(activity.createdAt).toLocaleDateString()}</span>
                      </div>
                      {activity.blendedWith && (
                        <div className="flex items-center space-x-1">
                          <Shuffle className="w-3.5 h-3.5" />
                          <span>Blended with: {truncateText(activity.blendedWith, 20)}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExpand(activity._id)}
                      className="flex items-center space-x-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isExpanded ? "Show Less" : "View Full"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Activity Summary */}
      {activities.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200 text-xs">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
            Activity Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{activities.length}</div>
              <div>Recent Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {activities.filter((a) => a.transformationType === "pitch").length}
              </div>
              <div>Pitches</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {activities.filter((a) => a.transformationType === "blend").length}
              </div>
              <div>Blends</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-pink-600">
                {activities.filter((a) => a.transformationType === "poem").length}
              </div>
              <div>Poems</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
