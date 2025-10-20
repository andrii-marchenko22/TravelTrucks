# TravelTrucks

[Visit Project](https://travel-trucks-serg.vercel.app/)

## Overview

**TravelTrucks** is the frontend part of a web application for a camper rental company. The app allows users to browse the camper catalog, view detailed information and reviews for individual campers, and submit booking requests.

The goal of the project is to provide a modern and user-friendly interface for searching and booking campers.

---

## Key Features

- Search campers by **location**.
- Filter by **vehicle type** and **equipment**.
- Browse the **full camper catalog**.
- View **detailed information** for individual campers.
- Display **user reviews**.
- **Booking form** with validation and helpful user prompts.
- Add campers to **favorites**.

---

## API Endpoints

The frontend communicates with the backend using the following endpoints:

- **GET /campers** - fetch all camper listings.  
  Filtering (by location, type, or equipment) is handled **on the backend**, not on the frontend.

- **GET /campers/:id** - fetch details of a specific camper by its unique ID.

---

## Routing

The project uses Next.js App Router for page navigation:

- `/` - **Home page**, featuring the search form for campers.
- `/catalog` - **Catalog page**, displaying all campers with filtering options.
- `/catalog/:id` - **Camper detail page**, showing features, reviews, and booking form.

---

## Tech Stack

- **Next.js 15** - server-side rendering and routing.
- **React 19** - component-based UI.
- **TypeScript** - static typing.
- **React Query (@tanstack/react-query)** - API requests and caching.
- **Zustand** - global state management (favorites).
- **React Datepicker** - date picker for booking.
- **React Hot Toast** - user notifications.
- **Axios** - HTTP client.
- **Lottie** - animations.
- **CSS Modules** - component styling.

## Usage

- Use the search form on the Home page to find campers.
- Open the Catalog page (/catalog) to see all available campers.
- Click on a specific camper in the catalog to view its details page (/catalog/:id).
- Fill out the booking form with name, email, and date to submit a booking request.

---

## Installation & Setup

### 1. Clone the repository:

```bash
git clone https://github.com/andrii-marchenko22/TravelTrucks.git
cd traveltrucks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

## Author

**Andrii Marchenko**

🔗 [GitHub](https://github.com/andrii-marchenko22)

🔗 [LinkedIn](www.linkedin.com/in/andrii-marchenko22)
