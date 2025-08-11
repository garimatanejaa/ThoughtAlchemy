import React, { useEffect, useState } from "react";
import axios from "axios";

const IdeaEvolutionViewer = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch last 3 ideas from backend
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/ideas/recent?limit=3"); // 👈 Adjusted to match backend
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
    fetchIdeas();
  }, []);

  const handleSelectIdea = async (idea) => {
    setSelectedIdea(idea);
    setEvolutionData(null);
    setLoading(true);
    try {
      const res = await axios.post("/api/evolution", {
        transformed: idea.transformedText,
        originalA: idea.originalText,
        originalB: idea.blendedWith || null
      });
      setEvolutionData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch evolution analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Idea Evolution Map</h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Recent Ideas List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className={`p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${
              selectedIdea?._id === idea._id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => handleSelectIdea(idea)}
          >
            <h2 className="font-semibold mb-2">
              {idea.transformationType === "blend" ? "Blended Idea" : "Transformed Idea"}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Original:</strong> {idea.originalText}
            </p>
            {idea.blendedWith && (
              <p className="text-sm text-gray-700 mb-1">
                <strong>Blended With:</strong> {idea.blendedWith}
              </p>
            )}
            <p className="text-sm text-gray-700">
              <strong>Result:</strong> {idea.transformedText}
            </p>
          </div>
        ))}
      </div>

      {/* Evolution Map Display */}
      {selectedIdea && evolutionData && (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">Evolution Analysis</h2>
          {evolutionData.raw_analysis ? (
            <p className="text-gray-700 whitespace-pre-wrap">
              {evolutionData.raw_analysis}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Core Elements Retained</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {evolutionData.core_elements_retained?.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Changes Made</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {evolutionData.changes_made?.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">New Elements Added</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {evolutionData.new_elements_added?.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Overall Direction</h3>
                <p className="text-gray-700">{evolutionData.overall_direction}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaEvolutionViewer;
