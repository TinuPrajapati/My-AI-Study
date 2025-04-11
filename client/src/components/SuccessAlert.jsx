import React, { useEffect } from 'react';
import { CheckCircle2, X, LightbulbIcon } from 'lucide-react';

 function SuccessAlert({ 
  onClose, 
  result
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10*1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-[slideDown_0.5s_ease-out] w-full max-w-2xl px-4"
    >
      <div className="bg-white rounded-lg shadow-xl border-2 border-green-500 overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
            <span className="text-lg font-medium">{result.message}</span>
          </div>
          <button
            onClick={()=>onClose(false)}
            className="p-1 hover:bg-green-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500"
            aria-label="Dismiss success message"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status */}
        <div className="px-6 py-4 bg-green-50">
          <div className="flex items-center space-x-2">
            <span className="text-green-700 font-medium">Status:</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium capitalize">
              {result.status}
            </span>
          </div>
        </div>

        {/* Suggestions */}
        {result?.suggestions && (
          <div className="px-6 py-4 border-t border-green-100">
            <div className="flex items-start space-x-3">
              <LightbulbIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">Suggestions for Improvement</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  {result?.suggestions}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuccessAlert;