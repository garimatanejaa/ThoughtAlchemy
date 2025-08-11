import React, { useEffect, useState } from "react";
import { Dna, Search, Filter, Eye, Copy, Calendar, Tag, Zap, Sparkles, FlaskConical, X, RefreshCw, BarChart3 } from "lucide-react";

const IdeaDNA = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIdea, setModalIdea] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copied, setCopied] = useState(false);

  // Mock token for demo
  const token = "demo-token";

  // Mock data for demonstration
  const mockIdeas = [
    {
      id: 1,
      originalText: "A mobile app that helps people find parking spots in busy cities using real-time data",
      transformedText: "🚗 **ParkSmart: The Ultimate Urban Parking Solution**\n\nRevolutionizing city parking with AI-powered spot detection and reservation system. Our platform connects drivers with available spaces in real-time, reducing traffic congestion and urban stress.\n\n**Key Features:**\n• Live parking availability mapping\n• Smart reservation system\n• Community-driven updates\n• Integration with payment systems",
      transformationType: "pitch",
      createdAt: "2025-08-10T14:30:00Z",
      dnaScore: 92
    },
    {
      id: 2,
      originalText: "Online platform for local artists to sell their work",
      transformedText: "In galleries of the digital age,\nWhere artists write on pixel page,\nCreativity finds its stage,\nLocal talent, center stage.\n\nBrushstrokes meet the screen,\nArt and commerce, perfect scene,\nDreams fulfilled, visions seen,\nIn this marketplace serene.",
      transformationType: "poem",
      createdAt: "2025-08-09T16:45:00Z",
      dnaScore: 78
    },
    {
      id: 3,
      originalText: "Sustainable food delivery service using electric bikes",
      transformedText: "**EcoEats Delivery: Sustainable Food Transport Plan**\n\n**Phase 1: Infrastructure Setup** (Month 1-2)\n• Acquire fleet of electric bikes\n• Establish charging stations\n• Partner with local restaurants\n• Hire and train delivery team\n\n**Phase 2: Launch** (Month 3)\n• Pilot program in select neighborhoods\n• Implement tracking system\n• Gather customer feedback\n\n**Phase 3: Scale** (Month 4-6)\n• Expand service area\n• Add more restaurant partners\n• Optimize delivery routes",
      transformationType: "plan",
      createdAt: "2025-08-08T11:20:00Z",
      dnaScore: 85
    }
  ];

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIdeas(mockIdeas);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.transformedText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || idea.transformationType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'pitch': return <Zap className="w-4 h-4" />;
      case 'poem': return <Sparkles className="w-4 h-4" />;
      case 'plan': return <BarChart3 className="w-4 h-4" />;
      default: return <FlaskConical className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'pitch': return 'from-blue-500 to-cyan-400';
      case 'poem': return 'from-pink-500 to-rose-400';
      case 'plan': return 'from-green-500 to-emerald-400';
      default: return 'from-purple-500 to-indigo-400';
    }
  };

  const getDNAVisualization = (originalText, transformedText) => {
    const originalWords = originalText.split(' ');
    const transformedWords = transformedText.split(' ');
    
    return originalWords.map((word, index) => {
      const isInTransformed = transformedWords.some(tWord => 
        tWord.toLowerCase().includes(word.toLowerCase()) && word.length > 3
      );
      return (
        <span
          key={index}
          className={`inline-block px-2 py-1 rounded m-1 text-xs ${
            isInTransformed 
              ? 'bg-green-200 text-green-800' 
              : 'bg-purple-200 text-purple-800'
          }`}
        >
          {word}
        </span>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
          <Dna className="w-8 h-8 text-white animate-pulse" />
        </div>
        <p className="text-gray-600 text-lg">Analyzing idea DNA sequences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-red-700 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Dna className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Idea DNA Laboratory
        </h1>
        <p className="text-gray-600 text-lg">
          Analyze the genetic structure of your transformed ideas
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your idea DNA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors bg-white"
            >
              <option value="all">All Types</option>
              <option value="pitch">Pitches</option>
              <option value="poem">Poems</option>
              <option value="plan">Plans</option>
              <option value="blend">Blends</option>
            </select>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-3 rounded-xl border border-purple-200">
            <span className="text-sm font-semibold text-purple-700">
              {filteredIdeas.length} DNA Sequences Found
            </span>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.length === 0 && !loading && (
          <div className="col-span-full text-center py-12">
            <Dna className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No idea DNA sequences match your criteria</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter settings</p>
          </div>
        )}

        {filteredIdeas.map((idea) => (
          <div
            key={idea.id || idea._id}
            onClick={() => setModalIdea(idea)}
            className="bg-white rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            {/* Card Header */}
            <div className={`p-4 bg-gradient-to-r ${getTypeColor(idea.transformationType)} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    {getTypeIcon(idea.transformationType)}
                  </div>
                  <span className="font-semibold text-sm uppercase tracking-wide">
                    {idea.transformationType || 'Unknown'}
                  </span>
                </div>
                <div className="bg-white/20 px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                  DNA: {idea.dnaScore || Math.floor(Math.random() * 40) + 60}%
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="mb-3">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Original Sequence</h4>
                <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
                  {idea.originalText || idea.original || "No original text"}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Evolved Form</h4>
                <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                  {idea.transformedText || idea.transformed || "No transformed text"}
                </p>
              </div>

              {/* DNA Preview */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h5 className="text-xs font-semibold text-gray-600 mb-2">DNA Pattern Preview</h5>
                <div className="flex flex-wrap gap-1">
                  {(idea.originalText || "").split(' ').slice(0, 6).map((word, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index % 3 === 0 ? 'bg-purple-400' : 
                        index % 3 === 1 ? 'bg-green-400' : 'bg-blue-400'
                      }`}
                      title={word}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(idea.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>Analyze</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {modalIdea && (
        <div
          onClick={() => setModalIdea(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${getTypeColor(modalIdea.transformationType)} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Dna className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">DNA Analysis Report</h3>
                    <p className="text-sm opacity-90">Sequence ID: {modalIdea.id || 'Unknown'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalIdea(null)}
                  className="w-10 h-10 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* DNA Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700 font-semibold">DNA Score</span>
                    <span className="text-2xl font-bold text-purple-800">{modalIdea.dnaScore || 85}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                      style={{width: `${modalIdea.dnaScore || 85}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-semibold">Complexity</span>
                    <span className="text-2xl font-bold text-green-800">
                      {Math.floor((modalIdea.originalText || "").split(' ').length / 10)}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Idea depth level</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-semibold">Evolution</span>
                    <span className="text-2xl font-bold text-blue-800">
                      {Math.floor(((modalIdea.transformedText || "").length / (modalIdea.originalText || "").length) * 100) || 100}%
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Growth factor</p>
                </div>
              </div>

              {/* Original DNA Sequence */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center text-white mr-2">
                      <span className="text-xs font-bold">O</span>
                    </div>
                    Original DNA Sequence
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <p className="text-gray-800 leading-relaxed">
                      {modalIdea.originalText || modalIdea.original}
                    </p>
                  </div>
                </div>

                {/* Transformed DNA Sequence */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800 flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white mr-2">
                        <span className="text-xs font-bold">T</span>
                      </div>
                      Transformed DNA Sequence
                    </h4>
                    <button
                      onClick={() => handleCopy(modalIdea.transformedText)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <pre className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">
                      {modalIdea.transformedText || modalIdea.transformed}
                    </pre>
                  </div>
                </div>

                {/* DNA Mapping Visualization */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center text-white mr-2">
                      <Dna className="w-4 h-4" />
                    </div>
                    DNA Mapping Analysis
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="inline-block w-3 h-3 bg-green-400 rounded mr-2"></span>
                      Preserved elements
                      <span className="inline-block w-3 h-3 bg-purple-400 rounded mr-2 ml-4"></span>
                      Original elements
                    </p>
                    <div className="flex flex-wrap">
                      {getDNAVisualization(modalIdea.originalText || "", modalIdea.transformedText || "")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(modalIdea.createdAt || Date.now()).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span className="capitalize">{modalIdea.transformationType}</span>
                </div>
              </div>
              
              {copied && (
                <div className="text-green-700 text-sm font-medium">
                  ✅ Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {!modalIdea && ideas.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-6 h-6 text-purple-500 mr-2" />
            DNA Analytics Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{ideas.length}</div>
              <div className="text-sm text-purple-700">Total Sequences</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {ideas.filter(i => i.transformationType === 'pitch').length}
              </div>
              <div className="text-sm text-blue-700">Pitch DNA</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-xl">
              <div className="text-2xl font-bold text-pink-600">
                {ideas.filter(i => i.transformationType === 'poem').length}
              </div>
              <div className="text-sm text-pink-700">Poem DNA</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {ideas.filter(i => i.transformationType === 'plan').length}
              </div>
              <div className="text-sm text-green-700">Plan DNA</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaDNA;