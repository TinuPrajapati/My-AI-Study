import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

function ErrorAlert({ result, onClose }) {
  return (
    <div className="fixed inset-0 bg-red-500/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="border-2 border-red-500 rounded-lg bg-red-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-red-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-700">Test Cases Failed</h2>
            </div>
            <button
              onClick={()=>onClose(false)}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
              aria-label="Close alert"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>
          </div>

          {/* Test Cases */}
          <div className="p-4 space-y-6">
            {result?.failedCases.map((testCase, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-md border border-red-200 shadow-sm"
              >
                <h3 className="font-semibold text-red-700 mb-2">
                  Test Case #{index + 1}
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-gray-700">Input Array: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {testCase?.input}
                    </code>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Expected Result: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {testCase?.expected}
                    </code>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Actual Result: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {testCase?.actual}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-red-200 bg-red-100">
            <h3 className="font-bold text-red-700 mb-2">Message</h3>
            <p className="text-red-600">
              {result.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorAlert;