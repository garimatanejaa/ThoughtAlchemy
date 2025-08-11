import React, { useState } from "react";
import { Sparkles, Send, Copy, RefreshCw, Lightbulb, FileText, Target, Scroll } from "lucide-react";

const transformationTypes = [
  { 
    label: "Pitch", 
    value: "pitch", 
    icon: <Target className="w-4 h-4" />,
    description: "Business presentation format",
    color: "from-blue-500 to-cyan-400"
  },
  { 
    label: "Poem", 
    value: "poem", 
    icon: <Scroll className="w-4 h-4" />,
    description: "Creative poetic expression",
    color: "from-pink-500 to-rose-400"
  },
  { 
    label: "Plan", 
    value: "plan", 
    icon: <FileText className="w-4 h-4" />,
    description: "Structured action plan",
    color: "from-green-500 to-emerald-400"
  },
];

const IdeaTransformation = () => {
  const [idea, setIdea] = useState("");
  const [type, setType] = useState("pitch");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setError(null);
    if (!idea.trim()) {
      setError("Please enter an idea to transform.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5001/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalText: idea, transformationType: type }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Transformation failed");
      }

      const data = await res.json();
      setResult(data.transformedText);
    } catch (e) {
      setError(e.message || "Transformation failed. Please try again.");
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

  const selectedType = transformationTypes.find(t => t.value === type);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Idea Transformation
        </h1>
        <p className="text-gray-600 text-lg">
          Transform your raw ideas into polished concepts with the power of AI alchemy
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Idea Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-purple-500" />
              Your Raw Idea
            </label>
            <div className="relative">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your idea... What's brewing in your mind?"
                rows={4}
                maxLength={500}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors resize-none text-gray-800 placeholder-gray-400"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {idea.length}/500
              </div>
            </div>
          </div>

          {/* Transformation Type Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Choose Your Transformation
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {transformationTypes.map((transformType) => (
                <button
                  key={transformType.value}
                  onClick={() => setType(transformType.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                    type === transformType.value
                      ? "border-purple-400 bg-purple-50 shadow-md scale-105"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${transformType.color} flex items-center justify-center text-white mr-3`}>
                      {transformType.icon}
                    </div>
                    <span className="font-semibold text-gray-800">{transformType.label}</span>
                  </div>
                  <p className="text-sm text-gray-600">{transformType.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !idea.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Alchemizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Transform Idea</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Result Header */}
          <div className={`px-6 py-4 bg-gradient-to-r ${selectedType.color} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  {selectedType.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Transformation Complete!</h3>
                  <p className="text-sm opacity-90">Your idea as a {selectedType.label.toLowerCase()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSubmit}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Result Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                  {result}
                </pre>
              </div>
            </div>
            
            {copied && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">✅ Copied to clipboard!</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 flex space-x-3">
            <button 
              onClick={() => setResult(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Start New
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Different Style</span>
            </button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      {!result && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
            Pro Tips for Better Transformations
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Be specific about your idea's core purpose and target audience
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Include any unique features or benefits that make it special
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Try different transformation types to explore various perspectives
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdeaTransformation;
