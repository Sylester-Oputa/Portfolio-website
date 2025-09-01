# 🌟 Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring elegant animations and a cosmic theme.

![Portfolio Preview](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **🎨 Modern Design**: Clean, professional layout with cosmic-themed animations
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🌙 Dark/Light Mode**: Toggle between themes with smooth transitions
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎭 Interactive Animations**: Floating elements, fade-in effects, and smooth transitions
- **🌌 Dynamic Background**: Animated star field and cloud effects
- **📧 Contact Form**: Integrated contact section with toast notifications
- **🔧 Component-Based**: Modular React components for easy maintenance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sylester-Oputa/Portfolio-website.git
   cd Portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (toast, etc.)
│   ├── AboutSection.jsx
│   ├── ContactSection.jsx
│   ├── HeroSection.jsx
│   ├── Navbar.jsx
│   ├── ProjectsSection.jsx
│   ├── SkillsSection.jsx
│   ├── StarBackground.jsx
│   ├── CloudBackground.jsx
│   ├── ThemeToggle.jsx
│   └── Footer.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   └── NotFound.jsx
├── hooks/               # Custom React hooks
│   └── use-toast.js
├── lib/                 # Utility functions
│   └── utils.js
├── assets/              # Static assets
└── App.jsx             # Main application component
```

## 🎨 Customization

### Colors and Themes
The color scheme is defined using CSS custom properties in `src/index.css`. You can easily customize the theme by modifying the color variables:

```css
:root {
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --primary: 250 47% 60%;
  /* ... */
}
```

### Animations
Custom animations are defined in the `@theme` block and can be adjusted for timing and effects:

```css
--animate-float: float 6s ease-in-out infinite;
--animate-fade-in: fade-in 0.7s ease-out forwards;
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Animations**: CSS keyframes and Tailwind transitions
- **Utilities**: Class Variance Authority (CVA), clsx

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌟 Key Components

### StarBackground
Creates a dynamic, animated star field background with randomized positioning and opacity.

### ThemeToggle
Implements smooth dark/light mode switching with system preference detection.

### Toast System
Custom toast notifications for user feedback and form submissions.

### Responsive Navigation
Mobile-first navigation with smooth animations and accessibility features.

## 👨‍💻 Author

**Sylester Oputa**
- GitHub: [@Sylester-Oputa](https://github.com/Sylester-Oputa)
- Portfolio: [My-Portfolio](https://portfolio-website-orcin-phi.vercel.app/)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Tailwind CSS for the utility-first CSS framework
- React community for excellent documentation and resources
- Vite team for the amazing build tool