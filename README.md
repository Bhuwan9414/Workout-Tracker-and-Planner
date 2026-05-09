# Fitness Workout Tracker & Planner

## Project Overview

A full-stack fitness workout tracking application where users can:

- Create workout routines
- Track workout sessions in real time
- Record sets, reps, and weights
- Measure workout duration and total training volume
- View workout history and analytics

The project is designed with a scalable architecture and real-world application flow.

---

# Core Goal

Build a production-style fitness application that demonstrates:

- Full-stack development
- Clean architecture
- REST API design
- State management
- Nested data modeling
- Authentication
- Real-world workout execution flow

---

# Main User Journey

## 1. User Authentication

User can:

- Register
- Login
- Stay authenticated using JWT

---

## 2. User Onboarding

After registration, user provides:

- Weight
- Height
- Fitness goal

Examples:

- Muscle Gain
- Fat Loss
- Maintenance

---

## 3. Create Workout Routine

User creates a routine with:

- Routine title
- Multiple exercises
- Multiple sets per exercise

Each set contains:

- Target reps
- Target weight

Example:

Routine: Push Day

- Bench Press
  - Set 1 → 40kg × 10 reps
  - Set 2 → 50kg × 8 reps

---

## 4. Workout Execution

User starts a saved routine.

Features:

- Workout timer starts
- User can mark sets as completed
- User can modify actual reps/weight performed
- User can discard workout
- User can finish workout

---

## 5. Workout Summary

After workout completion, user sees:

- Exercises completed
- Total sets completed
- Workout duration
- Total training volume

Volume Formula:

Volume = Σ(weight × reps)

---

# Tech Stack

## Frontend

- React
- Tailwind CSS
- Axios
- React Router
- Context API / Redux (optional later)

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

---

## Database

- MongoDB
- Mongoose

---

## Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

---

# High-Level Architecture

Frontend (React)
↓
Backend API (Node.js + Express)
↓
MongoDB Database

---

# Core System Entities

## 1. User

Stores:

- Name
- Email
- Password
- Weight
- Height
- Goal

---

## 2. Exercise

Predefined exercise database.

Stores:

- Exercise name
- Muscle group
- Category

Examples:

- Chest
- Legs
- Back
- Compound
- Isolation

---

## 3. Routine

Workout template created by user.

Contains:

- Routine title
- Exercises
- Sets
- Target reps
- Target weights

---

## 4. Workout Session

Actual performed workout.

Stores:

- Start time
- End time
- Duration
- Completed sets
- Actual reps/weight
- Total volume

---

# Backend Folder Structure

/server
  /config
  /controllers
  /models
  /routes
  /middlewares
  /services
  /utils
  app.js
  server.js

---

# Folder Responsibilities

## /config

Contains:

- Database connection
- Environment configuration

---

## /models

Contains database schemas.

Examples:

- User model
- Exercise model
- Routine model
- Workout model

---

## /controllers

Handles:

- Request handling
- Response sending

Controllers should stay lightweight.

---

## /services

Contains business logic.

Examples:

- Calculate workout volume
- Handle workout completion
- Process workout statistics

---

## /routes

Defines API endpoints.

Examples:

- /auth
- /routines
- /workouts

---

## /middlewares

Contains:

- JWT verification
- Error handling
- Validation middleware

---

## /utils

Reusable helper functions.

Examples:

- Token generation
- Date formatting
- Utility helpers

---

# API Design

Base URL:

/api/v1

---

# Authentication APIs

## Register
POST /api/v1/auth/register

## Login
POST /api/v1/auth/login

## Current User
GET /api/v1/auth/me

---

# User APIs

## Update Profile
PUT /api/v1/users/profile

---

# Exercise APIs

## Get Exercises
GET /api/v1/exercises

Supports:

- Search
- Filter
- Sorting

Example Query Params:

?search=bench
?muscleGroup=chest
?sort=name

---

# Routine APIs

## Create Routine
POST /api/v1/routines

## Get All Routines
GET /api/v1/routines

## Get Single Routine
GET /api/v1/routines/:id

## Update Routine
PUT /api/v1/routines/:id

## Delete Routine
DELETE /api/v1/routines/:id

---

# Workout APIs

## Start Workout
POST /api/v1/workouts/start

Creates workout session and stores start time.

---

## Complete Workout
POST /api/v1/workouts/complete

Backend calculates:

- Duration
- Total volume
- Workout statistics

---

## Workout History
GET /api/v1/workouts

---

## Single Workout
GET /api/v1/workouts/:id

---

# Important Design Decisions

## Routine vs Workout Session

Routine:

- Template
- Planned workout

Workout Session:

- Actual performed workout
- Stores real workout data

---

## Frontend State vs Database

Frontend State:

- Current workout progress
- Timer
- Set completion

Database:

- Final saved workout data
- Routines
- User information

---

## Why Workout Data Is Saved At End

Avoids:

- Excessive API calls
- Synchronization complexity
- Performance issues

Frontend handles live state.
Backend stores final workout result.

---

# Key Calculations

## Workout Duration

Duration = End Time - Start Time

---

## Training Volume

Volume = Σ(weight × reps)

---

# Validation Rules

- No negative reps
- No negative weight
- User can only access own routines
- Protected routes require JWT token
- Workout must exist before completion

---

# MVP Scope (Version 1)

Included:

- Authentication
- Workout routine creation
- Workout execution
- Workout tracking
- Workout summary
- Workout history

Excluded for now:

- AI recommendations
- Social features
- Notifications
- Advanced analytics
- Wearable integrations

---

# Future Enhancements

## AI Features

- AI-generated workout plans
- Recovery recommendations
- Smart progression suggestions

---

## Advanced Analytics

- Weekly progress charts
- PR tracking
- Muscle group analytics

---

## Additional Features

- Dark mode
- Workout streaks
- Rest timers
- Exercise notes
- Media uploads

---

# Development Principles

- Keep controllers lightweight
- Place business logic inside services
- Separate frontend state from backend persistence
- Build MVP first before adding features
- Focus on clean architecture and scalability

---

# Current Development Plan

## Phase 1

- Backend setup
- Database connection
- Authentication

---

## Phase 2

- Exercise APIs
- Routine APIs

---

## Phase 3

- Workout execution system
- Workout completion flow

---

## Phase 4

- Frontend integration
- Dashboard UI

---

## Phase 5

- Deployment
- Testing
- Optimization

---

# Resume Description

Fitness Workout Tracker & Planner (MERN Stack)

- Developed a full-stack fitness tracking application with workout planning and execution capabilities
- Implemented secure JWT authentication and RESTful API architecture
- Designed nested workout and routine management system
- Built workout analytics including duration and volume calculations
- Deployed scalable MERN stack application using Vercel and Render
