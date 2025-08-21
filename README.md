# Habit Tracking Journal

A simple and effective daily habit tracking journal that provides users with an intuitive interface to track habits and visualize their progress through customizable graphs.

## Current Status

This project is currently in the **Phase 1: Core Functionality** development stage. We have successfully implemented:
- Basic React frontend with placeholder UI
- Node.js/Express backend with database connection
- PostgreSQL database with initial schema
- Docker containerization for all components
- Successful communication between all services

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
   - Backend API: http://localhost:5001

### Development

The application is organized into three main components:

1. **Frontend**: React-based single-page application (port 3000)
2. **Backend**: Node.js/Express REST API (port 5001)
3. **Database**: PostgreSQL for data persistence (port 5432)

## Features Implemented So Far

- Basic frontend UI with React
- Backend API with Express
- Database schema for habits, habit entries, and daily highlights
- Docker containerization for all services
- Inter-service communication

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

1. **Phase 1**: Core Functionality ✅ (basic React frontend, Node.js backend, CRUD operations, binary habit tracking, Docker)
2. **Phase 2**: Enhanced UI (improved calendar, quantitative habits, daily highlights, styling)
3. **Phase 3**: Visualization (Chart.js integration, line/bar charts, graph configuration, export)
4. **Phase 4**: Polish & Testing (bug fixes, UX improvements, documentation, final testing)

## Troubleshooting

### Port Conflicts
If you encounter port conflicts, the application is configured to use:
- Frontend: port 3000
- Backend: port 5001 (changed from 5000 to avoid macOS Control Center conflicts)
- Database: port 5432

### Common Issues
1. **Port already in use**: Change the port mapping in `docker-compose.yml`
2. **Database connection errors**: Ensure all containers are running with `docker-compose ps`
3. **Frontend not loading**: Check that the frontend container is properly built with `docker-compose build --no-cache`

## Next Steps

We're currently working on implementing the full feature set described in the Product Requirements Document, including:
- Full habit tracking functionality (binary and quantitative)
- Calendar interface
- Dynamic graph system
- Habit management features
- Progress tracking and reporting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request