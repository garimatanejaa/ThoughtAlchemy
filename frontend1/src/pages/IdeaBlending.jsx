import React, { useState } from "react";
import {
  Shuffle,
  Plus,
  Copy,
  RefreshCw,
  Lightbulb,
  ArrowDown,
  Sparkles,
  FlaskConical,
  Users,
} from "lucide-react";

const IdeaBlending = () => {
  const [ideaA, setIdeaA] = useState("");
  const [ideaB, setIdeaB] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Use token from localStorage or fallback demo token
  const token = localStorage.getItem("token") || "demo-token";

  const handleBlend = async () => {
    setError(null);
    if (!ideaA.trim() || !ideaB.trim()) {
      setError("Please enter both ideas to create the perfect blend.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      // Call backend blend API
      const response = await fetch("http://localhost:5001/api/blend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idea1: ideaA.trim(),
          idea2: ideaB.trim(),
          transformationType: "blend",
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Blend failed");
      }

      const data = await response.json();

      setResult(data.transformedText || data.blended || data.result);

      // Save blended idea to /ideas
      await fetch("http://localhost:5001/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalText: `${ideaA} + ${ideaB}`,
          transformedText: data.transformedText || data.blended || data.result,
          transformationType: "blend",
          blendedWith: ideaB,
          dnaMapping: {
            parts: [
              { source: "idea1", text: ideaA },
              { source: "idea2", text: ideaB },
            ],
          },
        }),
      });
    } catch (e) {
      setError(e.message || "Blending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwapIdeas = () => {
    setIdeaA((prev) => {
      setIdeaB(prev);
      return ideaB;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Shuffle className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Idea Blending Laboratory
        </h1>
        <p className="text-gray-600 text-lg">
          Fuse two distinct concepts into one powerful innovation
        </p>
      </div>

      {/* Inputs */}
      {!result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 hover:shadow-xl transition-shadow">
            <label className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                A
              </div>
              First Concept
            </label>
            <textarea
              rows={6}
              value={ideaA}
              onChange={(e) => setIdeaA(e.target.value)}
              placeholder="Enter your first brilliant idea here... Be as detailed as you'd like!"
              className="w-full p-4 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none resize-none text-gray-800 placeholder-gray-400 bg-blue-50/20"
              maxLength={300}
            />
            <div className="text-right text-xs text-blue-500 font-medium mt-1">
              {ideaA.length}/300
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6 hover:shadow-xl transition-shadow">
            <label className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                B
              </div>
              Second Concept
            </label>
            <textarea
              rows={6}
              value={ideaB}
              onChange={(e) => setIdeaB(e.target.value)}
              placeholder="Enter your second innovative idea here... What's different about this one?"
              className="w-full p-4 rounded-xl border-2 border-green-200 focus:border-green-400 focus:outline-none resize-none text-gray-800 placeholder-gray-400 bg-green-50/20"
              maxLength={300}
            />
            <div className="text-right text-xs text-green-500 font-medium mt-1">
              {ideaB.length}/300
            </div>
          </div>
        </div>
      )}

      {/* Blend Button */}
      {!result && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBlend}
            disabled={loading || !ideaA.trim() || !ideaB.trim()}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 flex items-center space-x-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Fusion...</span>
              </>
            ) : (
              <>
                <FlaskConical className="w-6 h-6" />
                <span>Blend Ideas</span>
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-sm mt-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-500 text-sm">⚠</span>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mt-8">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white flex justify-between items-center">
            <h3 className="text-xl font-semibold">Blend Complete! 🎉</h3>
            <div className="flex space-x-3">
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={handleBlend}
                title="Re-blend"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setResult(null)}
                title="New Blend"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <Shuffle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6 whitespace-pre-wrap text-gray-800">{result}</div>

          {copied && (
            <div className="m-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">
                ✅ Blended idea copied to clipboard!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaBlending;
