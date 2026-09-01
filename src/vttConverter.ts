/**
 * Converts VTT (WebVTT) format to SRT (SubRip) format
 */

export interface Subtitle {
  index: number;
  start: string;
  end: string;
  text: string;
}

/**
 * Parse VTT content into subtitle objects
 */
export function parseVTT(content: string): Subtitle[] {
  const lines = content.split('\n');
  const subtitles: Subtitle[] = [];
  let i = 0;
  let index = 1;

  // Skip WEBVTT header
  while (i < lines.length && !lines[i].includes('-->')) {
    i++;
  }

  while (i < lines.length) {
    const line = lines[i].trim();

    // Look for timestamp line
    if (line.includes('-->')) {
      const [start, end] = line.split('-->').map(t => t.trim());
      
      // Collect all text lines until empty line
      const textLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '') {
        textLines.push(lines[i].trim());
        i++;
      }

      if (textLines.length > 0) {
        subtitles.push({
          index,
          start: convertTimeFormat(start),
          end: convertTimeFormat(end),
          text: textLines.join('\n'),
        });
        index++;
      }
    }
    i++;
  }

  return subtitles;
}

/**
 * Convert VTT time format (HH:MM:SS.mmm) to SRT time format (HH:MM:SS,mmm)
 */
function convertTimeFormat(time: string): string {
  // Remove any cue settings (e.g., position:0%, align:start)
  const cleanTime = time.split(' ')[0];
  // Replace the last dot with comma for milliseconds
  return cleanTime.replace('.', ',');
}

/**
 * Convert subtitle array to SRT format string
 */
export function subtitlesToSRT(subtitles: Subtitle[]): string {
  return subtitles
    .map(
      (sub) =>
        `${sub.index}\n${sub.start} --> ${sub.end}\n${sub.text}\n`
    )
    .join('\n');
}

/**
 * Main conversion function
 */
export function convertVTTtoSRT(vttContent: string): string {
  const subtitles = parseVTT(vttContent);
  return subtitlesToSRT(subtitles);
}

/**
 * Download content as a file
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
