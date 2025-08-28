"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomePage() {
  const quotes = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
    "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step. - Lao Tzu",
    "Don't be distracted by criticism. Remember—the only taste of success some people have is when they take a bite out of you. - Zig Ziglar",
    "What you do speaks so loud that I cannot hear what you say. - Ralph Waldo Emerson",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It does not matter how slowly you go so long as you do not stop. - Confucius",
    "The best way to predict the future is to create it. - Abraham Lincoln",
  ];

  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(selectedQuote);
  }, []); // The empty array ensures this effect runs only once after the initial render

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="flex flex-col items-center text-center space-y-6"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      {/* Logo */}
      <motion.div variants={fadeIn}>
        <Image
          src="/logo.png"
          alt="Doubt Solver Bot Logo"
          width={120}
          height={120}
          priority
        />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={fadeIn}
        className="text-3xl font-bold dark:text-white"
      >
        Welcome to <span className="text-blue-600">Doubt Solver Bot</span>
      </motion.h2>

      {/* Description */}
      <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        An AI-powered assistant that helps you solve academic doubts step by
        step. Start by entering a question and get a clear explanation instantly.
      </motion.p>

      {/* Random Quote */}
      <motion.div variants={fadeIn} className="w-full max-w-xl">
        <div className="border-l-4 border-blue-600 pl-4 py-2 text-left italic text-gray-700 dark:text-gray-300">
          <p>"{randomQuote}"</p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={fadeIn}>
        <Link
          href="/doubt"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
        >
          Get Started
        </Link>
      </motion.div>
    </motion.section>
  );
}