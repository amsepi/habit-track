# Habit Tracking Journal - Architectural Plan

## 1. Project Overview

The Habit Tracking Journal is a web application that allows users to track daily habits with both binary (done/not done) and quantitative tracking capabilities. The application features a calendar-based interface for daily tracking and visualization tools to monitor progress over time.

### Technology Stack
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose
- **Visualization**: Chart.js

## 2. Architecture Diagram

```mermaid
graph TD
    A[User Browser] --> B[Frontend Container]
    B --> C[Backend Container]
    C --> D[PostgreSQL Container]
    
    subgraph Docker Network
        B
        C
        D
    end
```

## 3. Container Structure

### 3.1 Frontend Container
- **Base Image**: node:18-alpine
- **Framework**: React 18 + TypeScript
- **Port**: 3000
- **Build Process**: 
  1. Install dependencies with npm
  2. Build production assets with webpack
- **Development Mode**: Hot reloading enabled

### 3.2 Backend Container
- **Base Image**: node:18-alpine
- **Framework**: Express.js
- **Port**: 5000
- **Key Dependencies**:
  - express: Web framework
  - pg: PostgreSQL client
  - cors: Cross-origin resource sharing
  - helmet: Security middleware
- **Environment Variables**:
  - DATABASE_URL: PostgreSQL connection string
  - NODE_ENV: Environment indicator

### 3.3 Database Container
- **Base Image**: postgres:14
- **Port**: 5432
- **Initialization**: SQL script to create tables
- **Persistence**: Docker volume for data storage
- **Environment Variables**:
  - POSTGRES_USER: Database user
  - POSTGRES_PASSWORD: Database password
  - POSTGRES_DB: Database name

## 4. Docker Compose Configuration

The application will be orchestrated using Docker Compose with the following configuration:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - habit-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@database:5432/habit
    depends_on:
      - database
    networks:
      - habit-network

  database:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=habit
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - habit-network

volumes:
  postgres_data:

networks:
  habit-network:
    driver: bridge
```

## 5. API Endpoints

### 5.1 Habit Management
```
GET    /api/habits              # Get all user habits
POST   /api/habits              # Create new habit
PUT    /api/habits/:id          # Update habit
DELETE /api/habits/:id          # Delete habit
```

### 5.2 Entry Management
```
GET    /api/entries/:date       # Get entries for specific date
POST   /api/entries             # Create/update habit entry
GET    /api/entries/range       # Get entries for date range
```

### 5.3 Reporting
```
GET    /api/reports/weekly      # Weekly progress summary
GET    /api/reports/monthly     # Monthly progress summary
```

## 6. Database Schema

```sql
-- Core tables for simple functionality
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'binary' or 'quantitative'
    unit VARCHAR(50),          -- 'hours', 'count', etc.
    target_value INTEGER,
    color VARCHAR(7),          -- Hex color code
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE habit_entries (
    id SERIAL PRIMARY KEY,
    habit_id INTEGER REFERENCES habits(id),
    entry_date DATE NOT NULL,
    completed BOOLEAN,         -- For binary habits
    value DECIMAL(10,2),       -- For quantitative habits
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE daily_highlights (
    id SERIAL PRIMARY KEY,
    entry_date DATE NOT NULL UNIQUE,
    highlight TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 7. Frontend Component Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarGrid.tsx
│   │   ├── CalendarDay.tsx
│   │   └── CalendarHeader.tsx
│   ├── Habit/
│   │   ├── HabitList.tsx
│   │   ├── HabitItem.tsx
│   │   └── HabitForm.tsx
│   ├── Graph/
│   │   ├── GraphView.tsx
│   │   └── GraphControls.tsx
│   ├── Entry/
│   │   ├── EntryForm.tsx
│   │   └── DailyHighlight.tsx
│   └── common/
│       ├── Header.tsx
│       └── Navigation.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── HabitManagement.tsx
│   └── Reports.tsx
├── services/
│   └── api.ts                 # API client
├── utils/
│   ├── dateUtils.ts
│   └── habitUtils.ts
└── App.tsx
```

## 8. Implementation Phases

### Phase 1: Core Functionality
- Basic React frontend with calendar grid
- Node.js backend with database connection
- CRUD operations for habits and entries
- Simple binary habit tracking
- Docker containerization

### Phase 2: Enhanced UI
- Improved calendar interface
- Quantitative habit support
- Daily highlights functionality
- Basic styling and responsive design

### Phase 3: Visualization
- Chart.js integration
- Line and bar chart implementation
- Graph configuration interface
- Export functionality

### Phase 4: Polish & Testing
- Bug fixes and performance optimization
- User experience improvements
- Documentation
- Final testing

## 9. Development Workflow

### 9.1 Initial Setup
1. Clone repository
2. Run `docker-compose up` to start all services
3. Access application at http://localhost:3000

### 9.2 Development Process
1. Create feature branch from main
2. Implement changes following component structure
3. Write tests for new functionality
4. Create pull request for review
5. Merge after approval

### 9.3 Deployment
1. Build production images with `docker-compose build`
2. Push images to container registry
3. Deploy to hosting platform (e.g., AWS, GCP)

## 10. Security Considerations

- Input validation on both frontend and backend
- SQL injection prevention through parameterized queries
- XSS protection through input sanitization
- CORS configuration to restrict origins
- Helmet middleware for HTTP security headers

## 11. Performance Considerations

- Database indexing on frequently queried columns
- Pagination for large data sets
- In-memory caching for frequently accessed data
- Optimized React component rendering
- Lazy loading for non-critical resources