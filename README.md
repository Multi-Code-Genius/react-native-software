<!-- ------------------------------------------------------------------- -->
<!--  README.md                                                          -->
<!-- ------------------------------------------------------------------- -->

# 📱 React Native App

A modern mobile application built with **React Native CLI** + **TypeScript**, using:

- **React Navigation** for routing  
- **NativeWind** (Tailwind CSS) for styling  
- **Zustand** for state‑management  
- **TanStack Query** for data‑fetching

<br />

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

npm install       # or: yarn
BASE_URL=https://your-api-url.com

npx react-native start

# Android (device or emulator)
npx react-native run-android

# iOS (macOS + Xcode only)
npx react-native run-ios

.
├── android/                 # Native Android code
├── ios/                     # Native iOS code
├── src/
│   ├── components/          # Reusable UI components
│   ├── navigation/          # React Navigation stacks / tabs
│   ├── screens/             # App screens
│   ├── store/               # Zustand stores
│   ├── config/              # QueryClient, axios, helpers
│   └── utils/               # Misc utilities
├── App.tsx                  # Entry point
├── .env                     # Environment variables
└── tailwind.config.js       # NativeWind / Tailwind config

