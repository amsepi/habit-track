# Daily Habit Tracking Journal - Product Requirements Document

## 1. Executive Summary

### Product Vision
A simple and effective daily habit tracking journal that provides users with an intuitive interface to track habits and visualize their progress through customizable graphs.

### Target Audience
- Individuals seeking to build better daily habits
- Students tracking study routines
- Anyone wanting a simple, visual way to monitor personal goals

### Core Value Proposition
- Clean, journal-style interface for daily habit tracking
- Flexible habit definition (binary completion or quantitative tracking)
- Dynamic graph generation for visual progress monitoring
- Simple reporting for weekly and monthly reviews

## 2. Product Overview

### Architecture
- **Frontend**: React-based single-page application
- **Backend**: Node.js/Express REST API
- **Database**: PostgreSQL for data persistence
- **Infrastructure**: Docker containerized application

### Core Interface Elements
1. **Monthly Calendar View**: Primary interface showing habit completion status
2. **Dynamic Graph Section**: Customizable charts for quantitative metrics
3. **Habit Management**: Add, edit, and delete habits
4. **Daily Highlights**: Simple one-line daily reflections

## 3. Core Features

### 3.1 Habit Tracking System

#### Binary Habits (Done/Not Done)
- **Visual Indicators**: Filled boxes (■) for completed, crossed boxes (✗) for missed
- **Habit Examples**: 
  - Exercise (30 minutes)
  - Read (20 pages)
  - Meditate (10 minutes)
  - Drink water (8 glasses)
- **Simple Tracking**: Click to mark complete/incomplete

#### Quantitative Habits
- **Numeric Input**: Track measurable activities
  - Screen time (hours)
  - Steps taken (count)
  - Money spent/saved
  - Pages read
  - Study hours
- **Unit Support**: Hours, minutes, count, currency
- **Daily Entry**: Simple numeric input fields

### 3.2 Calendar Interface

#### Monthly View
- **Grid Layout**: Traditional calendar grid (7 days × ~5 weeks)
- **Habit Rows**: Each habit displays as a row across all days
- **Quick Marking**: Click cells to toggle completion status
- **Navigation**: Previous/Next month buttons
- **Current Day Highlighting**: Clear indication of today's date

#### Daily Detail View
- **Expanded Day View**: Click on any day to see details
- **All Habits Listed**: Complete/incomplete status for selected day
- **Quantitative Entry**: Input fields for measurable habits
- **Daily Highlight**: Single text field for daily reflection

### 3.3 Dynamic Graph System

#### Graph Types
- **Line Charts**: Show trends over time (weight, mood, hours)
- **Bar Charts**: Compare daily/weekly values
- **Simple Visualizations**: Focus on clarity over complexity

#### Graph Configuration
- **Habit Selection**: Choose which habit to visualize
- **Time Range**: Week, month, or custom date range
- **Multiple Habits**: Display up to 3 habits on one graph
- **Y-Axis Customization**: Set min/max values for better scaling

#### Graph Features
- **Interactive Points**: Hover to see specific values
- **Date Navigation**: Click points to jump to specific dates
- **Export**: Simple PNG download functionality

### 3.4 Habit Management

#### Adding Habits
- **Habit Name**: Simple text input (e.g., "Morning Jog")
- **Habit Type**: Binary (done/not done) or Quantitative (numeric)
- **Unit Selection**: For quantitative habits (hours, minutes, count, etc.)
- **Target Value**: Optional daily goal for quantitative habits

#### Editing Habits
- **Name Changes**: Update habit descriptions
- **Type Conversion**: Change between binary and quantitative
- **Archive/Delete**: Remove habits while preserving historical data

#### Habit Categories
- **Color Coding**: Assign colors to different habit types
- **Simple Categories**: Health, Productivity, Learning, Personal
- **Visual Organization**: Color-coded rows in calendar view

### 3.5 Progress Tracking

#### Completion Statistics
- **Daily Summary**: Percentage of habits completed each day
- **Weekly Overview**: Average completion rate for the week
- **Monthly Summary**: Total habits completed, streak information
- **Longest Streaks**: Track consecutive days for each habit

#### Simple Analytics
- **Completion Rates**: Percentage completion for each habit
- **Best/Worst Days**: Identify patterns in daily performance
- **Weekly Patterns**: See which days of the week are most successful
- **Monthly Trends**: Basic trend analysis (improving/declining)

## 4. User Interface Design

### 4.1 Layout Structure
```
refere to ui_sketch.png

```

### 4.2 Visual Design Principles
- **Clean & Minimal**: Focus on functionality over decoration
- **High Contrast**: Clear visual distinction between completed/incomplete
- **Mobile Responsive**: Works well on phones and tablets
- **Fast Loading**: Optimized for quick daily check-ins

## 5. Technical Specifications

### 5.1 System Architecture

#### Container Structure
```
├── frontend/          (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/           (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── controllers/
│   └── package.json
├── database/          (PostgreSQL)
│   └── init.sql
└── docker-compose.yml
```

#### API Endpoints
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

#### Database Schema
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

### 5.2 Technology Stack

#### Frontend Technologies
- **React 18**: Component-based UI framework
- **TypeScript**: Type safety and better development experience
- **Chart.js**: Simple charting library for graphs
- **CSS Modules**: Scoped styling
- **Axios**: HTTP client for API calls

#### Backend Technologies
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **pg (node-postgres)**: PostgreSQL client
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware

#### Database
- **PostgreSQL 14**: Reliable relational database
- **Simple Schema**: Focus on essential data only

## 6. User Experience Flow

### 6.1 Daily Usage
1. **Open App**: Load current month view
2. **Quick Check**: See today's habits at a glance
3. **Mark Habits**: Click to mark completed habits
4. **Add Numbers**: Enter quantitative values where needed
5. **Daily Highlight**: Add one-sentence reflection (optional)
6. **View Progress**: Check graph for motivation

### 6.2 Weekly Review
1. **Navigate to Previous Week**: Use date navigation
2. **Review Completion**: See which habits were consistent
3. **Check Graphs**: Identify trends and patterns
4. **Plan Adjustments**: Mental note of what to improve

### 6.3 Habit Management
1. **Add New Habit**: Simple form with name and type
2. **Configure Settings**: Choose color and unit if quantitative
3. **Test Tracking**: Mark a few days to ensure it works
4. **Adjust if Needed**: Edit name or settings as needed

## 7. Data Management

### 7.1 Data Storage
- **Local Database**: All data stored in PostgreSQL container
- **No Cloud Sync**: Simple local-only storage
- **Backup**: Manual database export functionality
- **Data Retention**: Keep all historical data indefinitely

### 7.2 Performance Considerations
- **Efficient Queries**: Indexed date and habit_id columns
- **Pagination**: Load one month at a time
- **Caching**: Simple in-memory caching for current month
- **Optimized Rendering**: Only re-render changed components

## 8. Security & Privacy

### 8.1 Simple Security Measures
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Input sanitization
- **Local Access Only**: No external network requirements

### 8.2 Privacy
- **No User Accounts**: Single-user application per installation
- **Local Data**: All data stays on user's machine
- **No Tracking**: No analytics or external connections
- **No Sharing**: No social features or data sharing

## 9. Development Phases

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

## 10. Success Metrics

### 10.1 Functionality Goals
- **Reliability**: 99%+ uptime for local application
- **Performance**: < 2 second page loads
- **Usability**: Complete daily check-in in under 1 minute
- **Data Integrity**: No data loss during normal usage

### 10.2 User Experience Goals
- **Simplicity**: New users can start tracking within 5 minutes
- **Daily Usage**: Interface supports quick daily interactions
- **Visual Clarity**: Habit status immediately visible
- **Progress Motivation**: Graphs provide clear progress indication

## 11. Future Considerations

### 11.1 Potential Enhancements
- **Multiple Users**: Add simple user management
- **Data Export**: CSV export for external analysis
- **Themes**: Light/dark mode toggle
- **Habit Templates**: Pre-defined habit suggestions
- **Streak Tracking**: Visual streak indicators

### 11.2 Technical Improvements
- **PWA Support**: Offline functionality
- **Mobile App**: React Native version
- **Performance**: Database optimization for large datasets
- **Backup System**: Automated backup scheduling
