# 4AM MVMT - Fitness & Meal Tracking App

A mobile-friendly web application for planning and tracking workouts and meals.

## Features

- Workout Planning & Tracking
- Meal Planning & Tracking
- Mobile-friendly UI
- Firebase Integration

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Firebase project and update the configuration in `src/services/firebase.ts`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add these scripts to your `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Update the `vite.config.ts` file to include the base URL:
   ```typescript
   export default defineConfig({
     base: '/4amMvmt/',
     // ... other config
   })
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Firebase
- React Router 