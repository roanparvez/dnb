# Digital Note Board (DNB)

**Digital Note Board (DNB)** is a simple, fast, and intuitive web application that allows you to add notes, tasks, and project plans — just like using a physical board. Whether you're organizing daily tasks or planning projects, DNB helps you stay organized and productive.

---

## 📚 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Getting Started](#-getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)

- [Deployment](#-deployment)
- [Project Architecture](#-project-architecture)
- [Future Plans](#-future-plans)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

- 📌 Add and manage notes, tasks, and project plans
- 🗂️ Clean and minimal interface for easy navigation
- 📱 Fully responsive design — works on all devices
- 🚀 Fast performance for a smooth user experience
- ☁️ Accessible anytime, anywhere via web

---

## 🔗 Live Demo

You can check out the live application here:
[https://dnb-rho.vercel.app](https://dnb-rho.vercel.app)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/roanparvez/dnb.git
```

2. Navigate to the project directory:

```bash
cd dnb
```

3. Install dependencies:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` to see the app.

---

## 📦 Deployment

The project is deployed on [Vercel](https://vercel.com), offering seamless and fast deployment with automatic CI/CD.

---

## 🏗️ Project Architecture

- **Frontend:** Next.js with TypeScript
- **Styling:** Tailwind CSS and PostCSS
- **Package Management:** npm
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git (GitHub)
- **Deployment:** Vercel

Folder Structure:

```
├── public/         # Static assets
├── src/            # Application source code
│   ├── app/        # Application pages (Next.js routing)
│   ├── components/ # Reusable UI components
│   └── lib/        # Shared utilities
├── .gitignore      # Exclude files from Git
├── .vscode/        # VSCode settings
├── .husky/         # Git hooks
├── .eslintrc.json  # ESLint configuration
├── .prettierrc     # Prettier configuration
└── package.json    # Project metadata and scripts
```

---

## 🚀 Future Plans

- 📝 Add support for rich text editing in notes
- 🗃️ Introduce categories or labels for better organization
- 🔄 Implement note version history
- 🔒 Add user authentication and personal boards
- 🌐 Multi-language support
- 📊 Add basic analytics for productivity tracking

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

Made with ❤️ by [roanparvez](https://github.com/roanparvez).
