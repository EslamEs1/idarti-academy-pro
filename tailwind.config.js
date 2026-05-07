/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/**/*.html',
    './components/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF2FA',
          100: '#D6DEF1',
          200: '#A4B3DB',
          500: '#1E3A8A',
          600: '#15306E',
          700: '#0F2C5C',
          800: '#0A234A',
          900: '#0A1F44',
          950: '#06152E',
        },
        accent: {
          50:  '#FBF5E7',
          100: '#F6E8C2',
          200: '#EDD18A',
          400: '#DDB45F',
          500: '#D4A045',
          600: '#B58435',
          700: '#946826',
          800: '#754F18',
        },
        success: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          500: '#15A36E',
          600: '#11875B',
          700: '#0E6E49',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        info: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        surface: {
          50:  '#F4F6FB',
          100: '#FFFFFF',
        },
        text: {
          base:    '#1E293B',
          muted:   '#64748B',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'Segoe UI', 'Tahoma', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
