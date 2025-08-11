// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const IdeaEvolutionViewer = () => {
//   const [ideas, setIdeas] = useState([]);
//   const [selectedIdea, setSelectedIdea] = useState(null);
//   const [evolutionData, setEvolutionData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token"); // 👈 Ensure your login flow stores this

//   // Fetch last 3 ideas from backend
//   useEffect(() => {
//     const fetchIdeas = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           "http://localhost:5001/api/ideas/recent?limit=3",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // 👈 Send token
//             },
//           }
//         );
//         if (Array.isArray(res.data)) {
//           setIdeas(res.data);
//         } else {
//           console.error("Expected array, got:", res.data);
//           setError("Invalid ideas format from server");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch ideas");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) {
//       fetchIdeas();
//     } else {
//       setError("No authentication token found");
//     }
//   }, [token]);

//   const handleSelectIdea = async (idea) => {
//     setSelectedIdea(idea);
//     setEvolutionData(null);
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5001/api/evolution", // 👈 Include full URL
//         {
//           transformed: idea.transformedText,
//           originalA: idea.originalText,
//           originalB: idea.blendedWith || null,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // 👈 Send token
//           },
//         }
//       );
//       setEvolutionData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch evolution analysis");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">Idea Evolution Map</h1>

//       {loading && <p className="text-gray-500 text-center">Loading...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Recent Ideas List */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         {ideas.map((idea) => (
//           <div
//             key={idea._id}
//             className={`p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
//               selectedIdea?._id === idea._id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300"
//             }`}
//             onClick={() => handleSelectIdea(idea)}
//           >
//             <h2 className="font-semibold mb-2">
//               {idea.transformationType === "blend" ? "Blended Idea" : "Transformed Idea"}
//             </h2>
//             <p className="text-sm text-gray-700 mb-1">
//               <strong>Original:</strong> {idea.originalText}
//             </p>
//             {idea.blendedWith && (
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Blended With:</strong> {idea.blendedWith}
//               </p>
//             )}
//             <p className="text-sm text-gray-700">
//               <strong>Result:</strong> {idea.transformedText}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Evolution Map Display */}
//       {selectedIdea && evolutionData && (
//         <div className="p-6 border rounded-lg shadow-lg bg-white">
//           <h2 className="text-2xl font-bold mb-4">Evolution Analysis</h2>
//           {evolutionData.raw_analysis ? (
//             <p className="text-gray-700 whitespace-pre-wrap">
//               {evolutionData.raw_analysis}
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Core Elements Retained</h3>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {evolutionData.core_elements_retained?.map((el, i) => (
//                     <li key={i}>{el}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Changes Made</h3>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {evolutionData.changes_made?.map((el, i) => (
//                     <li key={i}>{el}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg mb-2">New Elements Added</h3>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {evolutionData.new_elements_added?.map((el, i) => (
//                     <li key={i}>{el}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Overall Direction</h3>
//                 <p className="text-gray-700">{evolutionData.overall_direction}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeaEvolutionViewer;


import React, { useEffect, useState } from "react";


import { Brain, Lightbulb, Zap, TrendingUp, Eye, RefreshCw, Sparkles, Copy } from "lucide-react";
import axios from "axios";

const IdeaEvolutionViewer = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // 👈 Ensure your login flow stores this

  // Fetch last 3 ideas from backend
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5001/api/ideas/recent?limit=3",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 Send token
            },
          }
        );
        if (Array.isArray(res.data)) {
          setIdeas(res.data);
        } else {
          console.error("Expected array, got:", res.data);
          setError("Invalid ideas format from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ideas");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchIdeas();
    } else {
      setError("No authentication token found");
    }
  }, [token]);

  const handleSelectIdea = async (idea) => {
    setSelectedIdea(idea);
    setEvolutionData(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5001/api/evolution", // 👈 Include full URL
        {
          transformed: idea.transformedText,
          originalA: idea.originalText,
          originalB: idea.blendedWith || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 Send token
          },
        }
      );
      setEvolutionData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch evolution analysis");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Idea Evolution Map
          </h1>
          <p className="text-gray-600 text-lg">
            Trace the evolution of your creative thoughts and understand their transformation journey
          </p>
        </div>

        {/* Loading State */}
        {loading && !ideas.length && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-6 h-6 text-purple-500 animate-spin mr-3" />
            <span className="text-gray-600 text-lg">Discovering your ideas...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Ideas Grid */}
        {ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-6 mb-8">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                onClick={() => handleSelectIdea(idea)}
                className={`cursor-pointer text-left p-6 rounded-2xl border-2 transition-all duration-200 group shadow-lg hover:shadow-xl hover:scale-105 min-h-[200px] flex flex-col ${
                  selectedIdea?._id === idea._id
                    ? "border-purple-400 bg-purple-50 shadow-md scale-105"
                    : "border-gray-200 hover:border-purple-300 bg-white"
                }`}
              >
              {/* Type Badge */}
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3 ${
                  idea.transformationType === "blend" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                }`}>
                  {idea.transformationType === "blend" ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Lightbulb className="w-4 h-4" />
                  )}
                </div>
                <span className="font-semibold text-gray-800">
                  {idea.transformationType === "blend" ? "Blended Idea" : "Transformed Idea"}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 flex-grow">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Original Idea
                  </label>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {idea.originalText}
                  </p>
                </div>

                {idea.blendedWith && (
                  <div>
                    <label className="block text-sm font-semibold text-purple-700 mb-1">
                      Blended With
                    </label>
                    <p className="text-purple-600 text-sm leading-relaxed">
                      {idea.blendedWith}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Transformed Result
                  </label>
                  <p className="text-gray-800 text-sm leading-relaxed font-medium">
                    {idea.transformedText}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-4 flex justify-end">
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
                          </div>
            ))}
          </div>
        )}

        {/* Evolution Analysis */}
        {selectedIdea && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Result Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Evolution Analysis Complete!</h3>
                    <p className="text-sm opacity-90">Understanding your idea's transformation journey</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    title="Copy analysis"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSelectIdea(selectedIdea)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    title="Refresh analysis"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-6 h-6 text-purple-500 animate-spin mr-3" />
                  <span className="text-gray-600">Analyzing evolution patterns...</span>
                </div>
              ) : evolutionData?.raw_analysis ? (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                    {evolutionData.raw_analysis}
                  </pre>
                </div>
              ) : evolutionData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Core Elements */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                      Core Elements Retained
                    </h3>
                    <div className="space-y-2">
                      {evolutionData.core_elements_retained?.map((element, i) => (
                        <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">{element}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Changes Made */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <RefreshCw className="w-5 h-5 text-purple-500 mr-2" />
                      Changes Made
                    </h3>
                    <div className="space-y-2">
                      {evolutionData.changes_made?.map((change, i) => (
                        <div key={i} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">{change}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New Elements */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Zap className="w-5 h-5 text-pink-500 mr-2" />
                      New Elements Added
                    </h3>
                    <div className="space-y-2">
                      {evolutionData.new_elements_added?.map((element, i) => (
                        <div key={i} className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                          <p className="text-gray-700 text-sm">{element}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overall Direction */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                      Overall Direction
                    </h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{evolutionData.overall_direction}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex space-x-3">
              <button 
                onClick={() => setSelectedIdea(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View All Ideas
              </button>
              <button 
                onClick={() => handleSelectIdea(selectedIdea)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Analysis</span>
              </button>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!selectedIdea && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Understanding Idea Evolution
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Click on any idea card to see detailed evolution analysis
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Blended ideas show how two concepts merge into something new
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Transformed ideas reveal how single concepts evolve and improve
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


export default IdeaEvolutionViewer;
