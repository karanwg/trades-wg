'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen light-bg relative flex items-center justify-center">
      {/* Background Effects */}
      <div className="light-bg-pattern" />
      <div className="light-bg-shapes" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black gradient-text mb-4">
            Sequence Question
          </h1>
          <p className="text-gray-600 text-xl">
            Master procedural skills through interactive sequencing challenges
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teacher Card */}
          <Link
            href="/teacher"
            className="group light-card p-16 text-center hover:scale-105 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              Teacher Experience
            </h2>
          </Link>

          {/* Student Card */}
          <Link
            href="/play"
            className="group light-card p-16 text-center hover:scale-105 transition-all duration-300"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              Student Experience
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
