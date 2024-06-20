# FitBuddy

FitBuddy is a comprehensive fitness tracking application developed by Team 01. It helps users track their workouts, monitor progress, and achieve their fitness goals.

> **Note:** We opted to use live cryptocurrency data instead of stock data due to the unavailability of free real-time stock data APIs on the internet.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

FitBuddy provides a platform for users to track their fitness activities, set goals, and view their progress over time. Whether you're a beginner or a seasoned athlete, FitBuddy offers the tools you need to stay on track.

## Features

- User authentication and profile management
- Workout tracking
- Progress monitoring
- Goal setting
- Community features (sharing progress, following friends)

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB

### Frontend
- React.js
- Redux
- Material-UI

### Other
- Cryptocurrency API (e.g., CoinGecko)

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and configure the environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```
    
3. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage

- Open your web browser and go to `http://localhost:3000`.
- Register a new account or log in with an existing account.
- Start tracking your workouts and monitor your fitness progress.

## Directory Structure


FITBUDDY-TEAM-01/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── .env.example
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ ├── .env.example
│ └── package.json
├── Testing/
├── Defect Sheet/
├── PPT/
├── .gitignore
├── README.md
├── package-lock.json
└── package.json


In this structure:

The backend folder contains all the backend code files.
The frontend folder contains all the frontend code files. 
The PPT folder contains presentation for the entire project. 
The testing folder contains documentation related to testing for the project.
