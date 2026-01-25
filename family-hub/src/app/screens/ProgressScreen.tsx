import React, { useState } from 'react';
import { Award, Download, X } from 'lucide-react';
import CertificateGenerator from '../../components/CertificateGenerator';
import ProgressExport from '../../components/ProgressExport';

const ProgressScreen: React.FC = () => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [showProgressExport, setShowProgressExport] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
          Progress & Certificates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          View your achievements and download certificates for completed activities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => {
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
            setShowCertificates(true);
          }}
          className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 
                     hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/10 
                     text-left min-h-[140px] flex flex-col justify-between active:scale-[0.98] transform-gpu hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Award className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Certificates
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Generate and download certificates for completed activities
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
            setShowProgressExport(true);
          }}
          className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 
                     hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/10 
                     text-left min-h-[140px] flex flex-col justify-between active:scale-[0.98] transform-gpu hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Download className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Export Progress
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Export your learning progress as a JSON file
            </p>
          </div>
        </button>
      </div>

      {/* Certificates Modal - Enhanced */}
      {showCertificates && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleIn border border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => {
                if ('vibrate' in navigator) {
                  navigator.vibrate(10);
                }
                setShowCertificates(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Certificate Generator
              </h2>
              <CertificateGenerator />
            </div>
          </div>
        </div>
      )}

      {/* Progress Export Modal - Enhanced */}
      {showProgressExport && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleIn border border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => {
                if ('vibrate' in navigator) {
                  navigator.vibrate(10);
                }
                setShowProgressExport(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Export Progress
              </h2>
              <ProgressExport onClose={() => setShowProgressExport(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressScreen;

