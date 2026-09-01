# VTT to SRT Converter

A React-based web application that converts WebVTT subtitle files to SRT (SubRip) format. Built with React, TypeScript, and Vite, styled with the VA Vets Design System.

## Features

- ✨ Simple drag-and-drop or file selection interface
- 🔄 Real-time VTT to SRT conversion
- 👀 Live preview of converted content
- 📥 Download converted SRT files
- 📱 Responsive design with Vets Design System styling
- ⚡ Fast build and development experience with Vite

## Project Setup

This project is set up in `/tmp/vtt-srt-converter` for development (the Documents/VS Code Apps folder blocks binary execution on this Mac).

### Development

Start the development server:

```bash
cd /tmp/vtt-srt-converter
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files are in the `dist/` directory.

## Deployment

### Local Hosting

To serve the production build locally:

```bash
npm run preview
```

### GitHub Pages Deployment

1. Push the repository to GitHub
2. Update the `base` in `vite.config.ts` if deploying to a subdirectory (currently set to `/vtt-to-srt-converter/`)
3. Run the deploy command:

```bash
npm run deploy
```

This requires the `gh-pages` package (already installed) and GitHub CLI (`gh`) authentication.

Alternatively, enable GitHub Actions:

1. In your GitHub repo, go to **Settings > Pages**
2. Set **Source** to `GitHub Actions`
3. Create a workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Project Structure

```
/tmp/vtt-srt-converter/
├── src/
│   ├── App.tsx           # Main app component
│   ├── App.css           # App styling
│   ├── vttConverter.ts   # VTT to SRT conversion logic
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── dist/                 # Production build output
```

## How It Works

### VTT to SRT Conversion

The converter handles:

1. **Time Format**: Converts VTT time format (HH:MM:SS.mmm) to SRT format (HH:MM:SS,mmm)
2. **Cue Parsing**: Removes VTT cue settings (position, align, etc.)
3. **Subtitle Indexing**: Automatically numbers subtitles sequentially
4. **Multiline Text**: Preserves multiline subtitle text

### Key Files

- **vttConverter.ts**: Core conversion logic
  - `parseVTT()`: Parse VTT content
  - `convertTimeFormat()`: Convert time stamps
  - `subtitlesToSRT()`: Format subtitles as SRT
  - `convertVTTtoSRT()`: Main conversion function
  - `downloadFile()`: Trigger file download

- **App.tsx**: React component with UI
  - File upload handling
  - Conversion triggering
  - Preview display
  - Download functionality

## Styling

The app uses the **VA Vets Design System** via USWDS (U.S. Web Design System):

- USWDS CSS framework
- VA-specific theme
- Responsive grid system
- Accessible form components

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **USWDS 3.8** - Design system
- **CSS** - Custom styling

## Browser Support

Works in all modern browsers that support ES2020 and the File API:

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run preview    # Preview production build
npm run deploy     # Deploy to GitHub Pages
```

## Notes

- The app runs entirely in the browser; no server processing required
- VTT files are read client-side using the File API
- Converted content can be previewed before download
- The app is fully self-contained and can be hosted as a static site

## License

Open source - feel free to use and modify as needed.
