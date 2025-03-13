/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#264653', // Dark Blue-Gray
        secondary: '#2A9D8F', // Teal
        accent: '#E9C46A', // Golden Yellow
        neutral: '#F4A261', // Orange
        cream: '#F5F5DC',
        'base-100': '#FFFFFF', // White base
        'base-200': '#F3F4F6', // Light gray for contrast
        'base-content': '#1E293B', // Dark blue-gray for text readability
        info: '#3B82F6',
        success: '#16A34A',
        warning: '#FACC15',
        error: '#DC2626',
      },
    },
  },
  plugins: [daisyui],
}
