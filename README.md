# Task Web Application

This is a task management web application built with React, TypeScript, and Vite.

# Table of Contents
 
- [Get Started](#get-started)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Run Application](#run-application)
    - [Using Scripts](#using-scripts)
    - [Using Docker](#using-docker)
- [Test Application](#test-application)
- [Contributing](#contributing)
- [License](#license)

# Get Started

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/)
- As a Language [Setup Typescript](https://www.typescriptlang.org/)
```js
npm install -g typescript
```

# Tech Stack

- Frontend: React, TypeScript, Vite
- State Management: Context API
- UI Library: Material UI
- HTTP Library: Axios
- Backend Intergration: [Express API](https://github.com/JeralSandeeptha/CoverageX-LLC-Technical-Assessment-Nodejs)

# Environment Variables

Create a .env file under the root folder.
```bash
VITE_BASE_URL=http://localhost:3000/api/v1
```

# Available Scripts

Start development server
```dash
npm run dev
```
Build the project for production
```dash
npm run build
```
Preview the production build
```dash
npm run preview
```
Run linting check
```dash
npm run lint
```

# Run Application

### Using Scripts

```bash
npm run dev
```

### Using Docker

- Build the image
```
docker build -t jeralsandeeptha/coveragex-react .
```

- Run the build image
```bash
docker run -p 5173:5173 -e VITE_BASE_URL=http://localhost:3000/api/v1 jeralsandeeptha/coveragex-react
```

# Test Application

# Contributing

Feel free to fork this repository, create a feature branch, and submit a pull request.

# License

This project is licensed under the MIT License.
