# Swedish Superapp Prototype

## Overview
A Swedish-language superapp that consolidates everyday services into a single platform with dynamic location-based recommendations, optimized for mobile-first usage with native app-like experience.

## Core Features

### Mobile-Optimized Home Screen
- Display four main service categories as mobile-friendly cards:
  - "Mat & Restaurang" (Food & Restaurant)
  - "Transportmedel" (Transportation)
  - "Restauranger" (Restaurants)
  - "Underhållning" (Entertainment)
- Responsive card layout optimized for smartphone screens
- Touch-friendly interface with clear visual hierarchy
- Native app-like navigation experience with smooth transitions
- Dynamic "nära dig" (nearby) sections showing location-specific recommendations beneath relevant category cards

### Dynamic Location-Based Functionality
- Automatic location detection using browser geolocation API on app load
- Real-time coordinate-based recommendations for restaurants and transport services
- Display "nära dig" listings dynamically based on user's current location
- Fallback system when location permission is denied, defaulting to Stockholm recommendations
- Location permission request with mobile-optimized dialogs
- Support for both GPS coordinates and city name-based queries

### Enhanced Mobile Navigation
- Smooth transitions between screens mimicking native app behavior
- Touch-optimized category cards with clear icons
- Intuitive back navigation and breadcrumb system
- Mobile-first responsive design patterns

### Category Pages
- Dynamic location-aware content for all categories
- "Transportmedel" page shows nearby Uber, Bolt services based on current location
- "Restauranger" page displays local restaurant recommendations for current area
- "Underhållning" page shows entertainment options near user's location
- "Mat & Restaurang" page combines food delivery and restaurant options for current area
- Mobile-optimized list views with easy scrolling and location indicators

### Mobile-First User Interface
- Swedish language throughout the application
- Native app-like design using mobile UI patterns
- Optimized touch targets and gesture-friendly interactions
- Responsive layout prioritizing smartphone experience
- Smooth animations and transitions for enhanced user experience
- Location status indicators showing current detected area

## Technical Requirements

### Frontend
- Implement automatic geolocation detection on app initialization
- Handle location permission requests with user-friendly Swedish prompts
- Send GPS coordinates or detected city name to backend for recommendations
- Display dynamic "nära dig" sections on home screen beneath category cards
- Implement fallback to Stockholm when location access is denied
- Store current location state and update recommendations dynamically
- Create mobile-optimized location permission dialogs
- Handle location errors gracefully with appropriate Swedish messaging

### Backend
- Accept GPS coordinates (latitude, longitude) from frontend requests
- Accept city names as alternative to coordinates for location queries
- Implement coordinate-to-city mapping for Swedish locations
- Provide location-aware API endpoints for all service categories
- Return nearby recommendations based on received coordinates or city
- Support dynamic querying of restaurants, transport, and entertainment options
- Handle location-based filtering for all four main categories

## Data Storage
The backend should store:
- Service category information and descriptions for all four categories
- Comprehensive location-based recommendation data including:
  - Restaurant data with location coordinates for major Swedish cities
  - Transport service availability by city/region (Uber, Bolt variants)
  - Entertainment venue information with location data
  - Food delivery service coverage areas
- City mapping data for coordinate-to-city conversion
- Fallback recommendation sets for major cities (Stockholm, Göteborg, Malmö)
- Category descriptions in Swedish:
  - "Transportmedel": Information about Uber, Bolt and similar ride services
  - "Restauranger": Local restaurant alternatives and recommendations
  - "Underhållning": Entertainment venues and activities
  - "Mat & Restaurang": Food delivery and dining options
