# Mitsubishi ASX 2011 Helper App

A comprehensive Progressive Web App (PWA) for Mitsubishi ASX 2011 owners, providing information about error codes, troubleshooting, maintenance, and repairs.

## Features

- 🌙 **Dark/Light Theme Toggle** - Working theme switcher with persistence
- 📱 **Progressive Web App** - Installable on mobile and desktop
- 🔧 **Error Codes Database** - Comprehensive error code lookup
- 🛠️ **Troubleshooting Guides** - Step-by-step problem diagnosis
- 📅 **Maintenance Schedules** - Service intervals and tips
- 🔩 **Parts Catalog** - OEM and aftermarket parts information
- 📱 **Responsive Design** - Works on all devices
- ⚡ **TypeScript** - Type-safe, maintainable code

## Recent Improvements

### ✅ Fixed Issues
- **Night Mode**: Theme toggle now works correctly with proper persistence
- **Navigation**: Removed hamburger menu, navigation is always visible
- **TypeScript**: Converted from JavaScript for better type safety
- **PWA Support**: Added full Progressive Web App functionality
- **Simplified Architecture**: Removed unnecessary complexity

### 🚀 New Features
- **PWA Installation**: App can be installed on devices
- **Offline Support**: Service worker for offline functionality
- **Better UX**: Cleaner, more intuitive interface
- **Type Safety**: Full TypeScript implementation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the app:
   ```bash
   ./build.sh
   ```

4. Serve the app:
   ```bash
   npm start
   ```

### Development

For development with auto-compilation:
```bash
npm run watch
```

## Project Structure

```
├── src/
│   └── app.ts              # Main TypeScript application
├── dist/                   # Compiled JavaScript output
├── icons/                  # PWA icons (SVG format)
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── styles.css              # Main stylesheet
├── index.html              # Main HTML file
└── tsconfig.json           # TypeScript configuration
```

## PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Works without internet connection
- **App-like Experience**: Standalone window on desktop
- **Fast Loading**: Cached resources for quick access

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS 11.3+)
- All modern browsers with ES2020 support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub.