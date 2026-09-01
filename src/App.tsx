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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Official U.S. government banner (VADS Banner - Official Gov) */}
      <div className="bg-va-base-lightest text-va-ink text-[0.8125rem]">
        <div className="max-w-[1000px] mx-auto px-4 py-1.5 flex items-center gap-2">
          <img
            src="https://design.va.gov/assets/img/tiny-usa-flag.png"
            alt=""
            width={16}
            height={11}
            aria-hidden="true"
          />
          <span>An official website of the United States government</span>
        </div>
      </div>

      {/* Header stripe with official VA logo (VADS Header - Minimal) */}
      <header className="bg-white border-b border-va-base-lighter">
        <div className="max-w-[1000px] mx-auto px-4 py-4">
          <a href="https://www.va.gov" className="inline-block no-underline">
            <img
              src={`${import.meta.env.BASE_URL}va-logo.png`}
              alt="VA U.S. Department of Veterans Affairs"
              className="h-9 w-auto"
            />
          </a>
        </div>
      </header>

      {/* Title band */}
      <div className="bg-va-primary-darker">
        <div className="max-w-[1000px] mx-auto px-4 py-6">
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            VTT to SRT Converter
          </h1>
          <p className="text-va-primary-lighter mt-1 text-lg">
            A subtitle conversion tool for Veterans and developers
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-[1000px] mx-auto px-4 py-10">
          <p className="text-lg text-va-base-darker leading-relaxed max-w-[72ex]">
            Convert WebVTT (.vtt) subtitle files to SRT (SubRip) format. Your file
            is processed entirely in your browser — nothing is uploaded to a server.
          </p>

          {/* Upload / convert */}
          <section className="mt-8 max-w-[46rem]" aria-labelledby="convert-heading">
            <h2 id="convert-heading" className="text-2xl font-bold mb-4">
              Convert a file
            </h2>

            <div className="space-y-2">
              <label htmlFor="vtt-file" className="block text-base font-bold text-va-ink">
                Select a VTT file
              </label>
              <input
                className="va-file-input"
                id="vtt-file"
                name="vtt-file"
                type="file"
                accept=".vtt"
                onChange={handleFileSelect}
                disabled={isConverting}
              />
              {selectedFile && (
                <p className="text-base text-va-base-dark mt-2">
                  Selected: <span className="font-bold text-va-ink">{selectedFile.name}</span>
                </p>
              )}
            </div>

            {error && (
              <div className="va-alert-error mt-6" role="alert">
                <h3 className="text-lg font-bold text-va-error-darker">Error</h3>
                <p className="text-va-ink mt-1">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                type="button"
                className="va-btn"
                onClick={handleConvert}
                disabled={!selectedFile || isConverting}
              >
                {isConverting ? 'Converting…' : 'Convert to SRT'}
              </button>

              {convertedContent && (
                <button type="button" className="va-btn-secondary" onClick={handleDownload}>
                  Download SRT file
                </button>
              )}
            </div>
          </section>

          {/* Preview */}
          {convertedContent && (
            <section className="mt-10 max-w-[46rem]" aria-labelledby="preview-heading">
              <h2 id="preview-heading" className="text-2xl font-bold mb-2">
                Preview
              </h2>
              <p className="text-base text-va-base-dark mb-3">Your converted SRT content:</p>
              <textarea
                className="va-textarea"
                id="preview"
                name="preview"
                rows={12}
                value={convertedContent}
                readOnly
              />
            </section>
          )}

          {/* How it works */}
          {!convertedContent && (
            <section className="mt-10 va-inset max-w-[46rem]" aria-labelledby="how-heading">
              <h2 id="how-heading" className="text-xl font-bold mb-3">
                How it works
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-va-base-darker">
                <li>Select a WebVTT (.vtt) subtitle file.</li>
                <li>Select <strong>Convert to SRT</strong> to transform the format.</li>
                <li>Preview the result and download your SRT file.</li>
              </ol>
            </section>
          )}
        </div>
      </main>

      {/* Footer (VADS Footer - Minimal) */}
      <footer className="bg-va-primary-darker text-white">
        <div className="max-w-[1000px] mx-auto px-4 py-8">
          <img
            src={`${import.meta.env.BASE_URL}va-logo.png`}
            alt="VA U.S. Department of Veterans Affairs"
            className="h-8 w-auto bg-white rounded px-2 py-1"
          />
          <p className="text-va-primary-lighter text-sm mt-4 max-w-[72ex]">
            This is an independent, open-source tool and is not an official website of
            the U.S. Department of Veterans Affairs.
          </p>
          <p className="text-white text-sm mt-4">
            Created by <strong>Dominique Ramirez</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
