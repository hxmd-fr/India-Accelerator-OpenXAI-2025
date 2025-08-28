"use client";

import { useState } from "react";
import Image from "next/image";

export default function DoubtPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = async () => {
    if (!question.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/solve-doubt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAnswer(data.answer); // Assuming your backend returns an object like { answer: '...' }
      } else {
        // Handle backend errors
        setAnswer('Error: Could not solve your doubt. Please try again.');
      }
      
    } catch (error) {
      console.error('Failed to fetch from backend:', error);
      setAnswer('Error: Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>

      <h2 className="text-2xl font-semibold text-center dark:text-white">
        Ask Your Doubt
      </h2>

      {/* Input box */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="w-full h-32 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
      />

      {/* Button */}
      <button
        onClick={handleSolve}
        disabled={isLoading}
        className={`px-6 py-3 text-white rounded-lg shadow transition-colors w-full ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Solving..." : "Solve Doubt"}
      </button>

      {/* Answer */}
      {answer && (
        <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 space-y-4">
          <div className="text-gray-800 dark:text-gray-200">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm mb-2 whitespace-pre-line">
              {answer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}