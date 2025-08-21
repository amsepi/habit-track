# Habit Tracking Journal

A simple and effective daily habit tracking journal that provides users with an intuitive interface to track habits and visualize their progress through customizable graphs.

## Project Structure

```
habit-track/
├── frontend/          # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js/Express backend API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── controllers/
│   └── package.json
├── database/          # PostgreSQL database files
│   └── init.sql
├── docker-compose.yml # Docker orchestration file
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd habit-track
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Development

The application is organized into three main components:

1. **Frontend**: React-based single-page application
2. **Backend**: Node.js/Express REST API
3. **Database**: PostgreSQL for data persistence

## Features

- Binary habit tracking (done/not done)
- Quantitative habit tracking (with units)
- Monthly calendar view
- Dynamic graph generation
- Simple reporting for weekly and monthly reviews

## Technology Stack

- **Frontend**: React + TypeScript + Chart.js
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Infrastructure**: Docker containerized application

## API Endpoints

```
GET    /api/habits              # Get all user habits
POST   /api/habits              # Create new habit
PUT    /api/habits/:id          # Update habit
DELETE /api/habits/:id          # Delete habit

GET    /api/entries/:date       # Get entries for specific date
POST   /api/entries             # Create/update habit entry
GET    /api/entries/range       # Get entries for date range

GET    /api/reports/weekly      # Weekly progress summary
GET    /api/reports/monthly     # Monthly progress summary
```

## Database Schema

The application uses a simple schema with three main tables:

1. `habits` - Stores habit definitions
2. `habit_entries` - Stores daily habit tracking data
3. `daily_highlights` - Stores daily reflections

## Development Phases

1. **Phase 1**: Core Functionality (basic React frontend, Node.js backend, CRUD operations, binary habit tracking, Docker)
2. **Phase 2**: Enhanced UI (improved calendar, quantitative habits, daily highlights, styling)
3. **Phase 3**: Visualization (Chart.js integration, line/bar charts, graph configuration, export)
4. **Phase 4**: Polish & Testing (bug fixes, UX improvements, documentation, final testing)