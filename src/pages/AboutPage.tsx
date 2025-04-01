import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 w-[100vw]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6 text-slate-700">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">About Alternative Song Lyrics</h1>
            
            <div className="prose max-w-none">
              <p className="mb-4">
                Welcome to Alternative Song Lyrics, a unique platform dedicated to discovering and 
                managing alternative (2nd creation) versions of popular songs that are often missed 
                by mainstream platforms due to licensing constraints.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Our Mission</h2>
              <p className="mb-4">
                We aim to bridge the gap between original songs and their creative reinterpretations, 
                providing a comprehensive database that connects music lovers to both original and 
                alternative versions of their favorite songs.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Features</h2>
              <ul className="list-disc pl-5 mb-4">
                <li className="mb-2">Advanced search functionality by original singer, alternative creator, and song names</li>
                <li className="mb-2">Detailed song information including original and alternative lyrics</li>
                <li className="mb-2">Direct links to YouTube videos for both versions</li>
                <li className="mb-2">Secure authentication system</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Technology</h2>
              <p className="mb-4">
                Built with modern web technologies including React, TypeScript, and AWS infrastructure, 
                our platform ensures a fast, reliable, and secure experience for all users.
              </p>

              <div className="mt-8">
                <Link 
                  to="/"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
