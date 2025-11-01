module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B4513", // coffee-brown
          50: "#F7F3F0", // coffee-brown-50
          100: "#EDE4DC", // coffee-brown-100
          200: "#D4C0B0", // coffee-brown-200
          300: "#BB9C84", // coffee-brown-300
          400: "#A27858", // coffee-brown-400
          500: "#8B4513", // coffee-brown-500
          600: "#6F370F", // coffee-brown-600
          700: "#532A0B", // coffee-brown-700
          800: "#371C07", // coffee-brown-800
          900: "#1B0E04", // coffee-brown-900
        },
        secondary: {
          DEFAULT: "#CD853F", // terracotta
          50: "#FBF7F2", // terracotta-50
          100: "#F5EBD9", // terracotta-100
          200: "#E8D0A6", // terracotta-200
          300: "#DBB573", // terracotta-300
          400: "#CE9A40", // terracotta-400
          500: "#CD853F", // terracotta-500
          600: "#A46A32", // terracotta-600
          700: "#7B4F26", // terracotta-700
          800: "#523519", // terracotta-800
          900: "#291A0D", // terracotta-900
        },
        accent: {
          DEFAULT: "#FF6B35", // coral
          50: "#FFF4F1", // coral-50
          100: "#FFE4DC", // coral-100
          200: "#FFC4B0", // coral-200
          300: "#FFA384", // coral-300
          400: "#FF8258", // coral-400
          500: "#FF6B35", // coral-500
          600: "#CC552A", // coral-600
          700: "#99401F", // coral-700
          800: "#662B15", // coral-800
          900: "#33150A", // coral-900
        },
        background: "#FEFCF8", // warm-white
        surface: "#FFFFFF", // pure-white
        text: {
          primary: "#2C1810", // dark-brown
          secondary: "#6B4E3D", // medium-brown
        },
        success: {
          DEFAULT: "#228B22", // forest-green
          50: "#F0F8F0", // forest-green-50
          100: "#D4F4D4", // forest-green-100
          200: "#A8E6A8", // forest-green-200
          300: "#7DD87D", // forest-green-300
          400: "#52CA52", // forest-green-400
          500: "#228B22", // forest-green-500
          600: "#1B6F1B", // forest-green-600
          700: "#145314", // forest-green-700
          800: "#0E370E", // forest-green-800
          900: "#071B07", // forest-green-900
        },
        warning: {
          DEFAULT: "#FF8C00", // warm-orange
          50: "#FFF7F0", // warm-orange-50
          100: "#FFE8CC", // warm-orange-100
          200: "#FFD199", // warm-orange-200
          300: "#FFBA66", // warm-orange-300
          400: "#FFA333", // warm-orange-400
          500: "#FF8C00", // warm-orange-500
          600: "#CC7000", // warm-orange-600
          700: "#995400", // warm-orange-700
          800: "#663800", // warm-orange-800
          900: "#331C00", // warm-orange-900
        },
        error: {
          DEFAULT: "#DC143C", // crimson-red
          50: "#FDF2F4", // crimson-red-50
          100: "#F9D6DD", // crimson-red-100
          200: "#F2ADBB", // crimson-red-200
          300: "#EC8499", // crimson-red-300
          400: "#E55B77", // crimson-red-400
          500: "#DC143C", // crimson-red-500
          600: "#B01030", // crimson-red-600
          700: "#840C24", // crimson-red-700
          800: "#580818", // crimson-red-800
          900: "#2C040C", // crimson-red-900
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'warm': '0 2px 8px rgba(139, 69, 19, 0.1)',
        'warm-md': '0 4px 12px rgba(139, 69, 19, 0.12)',
        'warm-lg': '0 8px 16px rgba(139, 69, 19, 0.15)',
        'warm-xl': '0 16px 24px rgba(139, 69, 19, 0.18)',
      },
      animation: {
        'spring': 'spring 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'smooth 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        spring: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        smooth: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'warm': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}