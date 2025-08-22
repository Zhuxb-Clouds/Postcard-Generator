# Postcard Generator

An interactive web application for designing and creating custom postcards using React, TypeScript, and Fabric.js. This tool allows users to design beautiful postcards with text, shapes, images, and customize them with various properties.

## Features

- Add text, shapes (rectangles, circles), and images to your postcard
- Customize colors, sizes, positions, and other properties
- Drag and drop elements to position them
- Double click text to edit content
- Export your design as a PNG image
- Simple and intuitive user interface+ TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Technologies Used

- React with TypeScript
- Fabric.js for canvas manipulation
- Vite for fast development and building
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Zhuxb-Clouds/Postcard-Generator.git
cd Postcard-Generator
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Use the toolbar on the left to add elements to your postcard
2. Select an element to edit its properties in the panel on the right
3. Drag elements to position them on the canvas
4. Double-click text elements to edit their content
5. When you're done, click "Export PNG" to download your postcard

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
