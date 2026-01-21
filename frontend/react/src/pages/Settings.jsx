import React from 'react'

function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-base mt-2">Customize your experience</p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🚀 Coming Soon Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-lg">📄</span>
                <span><strong>Pagination:</strong> Better navigation through large datasets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🌙</span>
                <span><strong>Dark/Light Theme:</strong> Toggle between themes for comfortable viewing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⚡</span>
                <span><strong>Lazy Loading:</strong> Improved performance with lazy loading</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📊</span>
                <span><strong>Advanced Filtering:</strong> More powerful search and filter options</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">More features will be added soon to enhance your experience. Stay tuned! 🎉</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;
