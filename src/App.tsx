import React, { useState } from 'react';
import { convertVTTtoSRT, downloadFile } from './vttConverter';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedContent, setConvertedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setConvertedContent(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.vtt')) {
      setError('Please select a valid VTT file (.vtt)');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a VTT file');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const content = await selectedFile.text();
      const srtContent = convertVTTtoSRT(content);
      setConvertedContent(srtContent);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error converting file'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedContent || !selectedFile) return;

    const filename = selectedFile.name.replace('.vtt', '.srt');
    downloadFile(convertedContent, filename);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Header - VA Vets Design System */}
      <header className="bg-[#003d7a] border-b-4 border-[#f76707] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* VA Seal */}
            <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="23" fill="white" stroke="#003d7a" strokeWidth="2"/>
              <circle cx="24" cy="24" r="20" fill="none" stroke="#003d7a" strokeWidth="1.5"/>
              <text x="24" y="30" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#003d7a" fontFamily="sans-serif">VA</text>
              <circle cx="24" cy="24" r="18" fill="none" stroke="#f76707" strokeWidth="1"/>
            </svg>
            <div>
              <h1 className="text-3xl font-bold text-white">VTT to SRT Converter</h1>
              <p className="text-blue-100 text-sm">Department of Veterans Affairs</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Intro Section */}
          <div className="text-center space-y-3">
            <p className="text-lg text-slate-600 leading-relaxed">
              Convert WebVTT subtitle files to SRT (SubRip) format instantly. Upload your VTT file and download the converted SRT file.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="space-y-6">
              {/* File Input */}
              <div className="space-y-3">
                <label htmlFor="vtt-file" className="block text-sm font-semibold text-slate-900">
                  📁 Select VTT File
                </label>
                <input
                  className="file-input"
                  id="vtt-file"
                  name="vtt-file"
                  type="file"
                  accept=".vtt"
                  onChange={handleFileSelect}
                  disabled={isConverting}
                />
                {selectedFile && (
                  <p className="text-sm text-slate-600 mt-2">
                    ✓ Selected: <span className="font-semibold text-va-blue">{selectedFile.name}</span>
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert-error" role="alert">
                  <h4>⚠️ Error</h4>
                  <p>{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="px-6 py-3 bg-[#003d7a] text-white font-semibold rounded-lg hover:bg-[#001a4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                >
                  {isConverting ? '⏳ Converting...' : '🔄 Convert to SRT'}
                </button>

                {convertedContent && (
                  <button
                    className="px-6 py-3 bg-[#f76707] text-white font-semibold rounded-lg hover:bg-[#e55a00] transition-colors shadow-md hover:shadow-lg"
                    onClick={handleDownload}
                  >
                    💾 Download SRT File
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {convertedContent && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">👁️ Preview</h2>
              <p className="text-sm text-slate-600">Here's your converted SRT content:</p>
              <textarea
                className="textarea-custom"
                id="preview"
                name="preview"
                rows={12}
                value={convertedContent}
                readOnly
              />
            </div>
          )}

          {/* Info Section */}
          {!convertedContent && (
            <div className="bg-gradient-to-r from-[#e8f1ff] to-[#f0f7ff] rounded-2xl p-8 border-l-4 border-[#003d7a]">
              <h3 className="text-lg font-bold text-[#003d7a] mb-4">ℹ️ How it works</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#003d7a] font-bold text-lg">1.</span>
                  <span>Upload a WebVTT (.vtt) subtitle file</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#003d7a] font-bold text-lg">2.</span>
                  <span>Click "Convert to SRT" to transform the format</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#003d7a] font-bold text-lg">3.</span>
                  <span>Preview the converted content and download</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Footer - VA Vets Design System */}
      <footer className="bg-[#003d7a] text-white border-t-4 border-[#f76707] mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">About This Tool</h3>
              <p className="text-blue-100 text-sm">
                Convert WebVTT subtitle files to SRT format with ease.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Technology</h3>
              <p className="text-blue-100 text-sm">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">VA Resources</h3>
              <p className="text-blue-100 text-sm">
                Department of Veterans Affairs
              </p>
            </div>
          </div>
          <div className="border-t border-blue-400 mt-6 pt-6 text-center text-blue-100 text-xs">
            <p>An open-source tool for veterans and developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
