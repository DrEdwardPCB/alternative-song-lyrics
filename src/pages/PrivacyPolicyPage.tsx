import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 w-[100vw]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6 text-slate-700">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-medium text-slate-900 mt-6 mb-3">1.1 Authentication Data</h3>
              <p className="mb-4">
                When you sign in using Google Sign-In, we collect:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Your email address</li>
              </ul>

              <h3 className="text-xl font-medium text-slate-900 mt-6 mb-3">1.2 Usage Data</h3>
              <p className="mb-4">
                We collect anonymous usage data including:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Search queries</li>
                <li>Pages visited</li>
                <li>Time spent on the platform</li>
                <li>Browser type and version</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Provide and maintain our services</li>
                <li>Improve user experience</li>
                <li>Process and manage your account</li>
                <li>Send you important updates</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Third-Party Services</h2>
              <p className="mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Google Sign-In for authentication</li>
                <li>Google AdSense for advertising</li>
                <li>AWS for hosting and data storage</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Secure HTTPS encryption</li>
                <li>AWS security best practices</li>
                <li>Regular security audits</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of communications</li>
                <li>Request data corrections</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Contact Us</h2>
              <p className="mb-4">
                For any privacy-related questions or concerns, please contact us at:
                <br />
                Email: privacy@alternativesonglyrics.com
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
