# 🚀 CollabHUB / DevEvent

> **The Hub for Every Dev Event You Can't Miss.**  
> Discover hackathons, meetups, and tech conferences worldwide, book your spot in seconds, and publish your own developer gatherings.

---

## 🌟 Key Features

- **⚡ Modern Architecture**: Built with **Next.js 16 (App Router + Turbopack)** and **React 19**.
- **🎨 Stunning Cyberpunk / Dark Aesthetic**:
  - Glassmorphic navigation header with smooth section scrolling.
  - Interactive WebGL **LightRays** reactive mouse canvas animation.
  - Tailored color palette, custom gradients, and responsive card layouts.
- **📅 Dynamic Event Directory**:
  - Browse featured events with locations, dates, timings, tags, and mode indicators (*In-Person*, *Hybrid*, *Online*).
  - Smooth anchor navigation linking to featured events directly from the hero button and navbar.
- **🔍 Detailed Event Pages (`/events/[slug]`)**:
  - Deep-dive into agendas, organizer background, audience targeting, and venue information.
  - **Smart Recommendations**: Dynamic *"Similar Events"* suggestions matched by event tags.
  - **One-Click RSVP**: Embedded attendee booking form validated directly against the database.
- **✍️ Interactive Event Publisher (`/events/create`)**:
  - Submit new events with custom titles, agendas, target audiences, and locations.
  - Select from included poster presets or provide external image uploads via Cloudinary.
- **💾 Full MongoDB & Mongoose Integration**:
  - Strongly typed data models with schema-level validation, unique slug indexes, and pre-save hooks.
  - Standalone seeding script (`lib/seed.ts`) to initialize or reset sample events anytime.
- **📊 PostHog Analytics**:
  - Integrated client telemetry for tracking event selections, exploration actions, and booking completions.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (Turbopack, App Router) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss`, `tw-animate-css` |
| **Animations & WebGL** | `OGL` (LightRays shader), `GSAP` |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/), [Mongoose 9](https://mongoosejs.com/) |
| **Media Hosting** | [Cloudinary](https://cloudinary.com/) |
| **Telemetry** | [PostHog](https://posthog.com/) |

---

## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── route.ts          # GET all events & POST new event
│   │       └── [slug]/
│   │           └── route.ts      # GET single event by slug
│   ├── events/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Dynamic event details page
│   │   └── create/
│   │       └── page.tsx          # Event publishing form
│   ├── globals.css               # Design system & Tailwind theme
│   ├── layout.tsx                # Root layout with Navbar & LightRays
│   └── page.tsx                  # Homepage directory
├── components/
│   ├── BookEvent.tsx             # Booking submission card
│   ├── EventCard.tsx             # Event preview card
│   ├── EventDetails.tsx          # Full event layout & agenda breakdown
│   ├── ExploreBtn.tsx            # Smooth scroll CTA
│   ├── LightRays.tsx             # WebGL particle background
│   └── Navbar.tsx                # Responsive navigation header
├── database/
│   ├── booking.model.ts          # Mongoose schema for attendee bookings
│   ├── event.model.ts            # Mongoose schema for events
│   └── index.ts                  # Database exports
├── lib/
│   ├── actions/                  # Server Actions (event & booking logic)
│   ├── constants.ts              # Default fallback event items
│   ├── mongodb.ts                # Cached MongoDB connection pool
│   └── seed.ts                   # Database seed script
├── public/
│   ├── icons/                    # UI icons (pin, calendar, clock, etc.)
│   └── images/                   # Local event posters & banners
├── .env.example                  # Environment variable blueprint
└── next.config.ts                # Next.js configuration (Turbopack, Cache Components)
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm** or **yarn** or **pnpm**
- A **MongoDB** connection string (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 2. Clone the Repository

```bash
git clone https://github.com/itsrituraz/CollabHUB.git
cd CollabHUB
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Duplicate `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your configuration:

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Base App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/events_db

# Cloudinary (Optional - for image upload handling)
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

### 5. Seed the Database

Populate your MongoDB database with sample events:

```bash
npx tsx lib/seed.ts
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To test and create an optimized production build:

```bash
npm run build
npm start
```

---

## 🔌 API Reference

### `GET /api/events`
Returns all events sorted chronologically by creation date.

**Response**:
```json
{
  "message": "Events fetched successfully",
  "events": [ /* array of event objects */ ]
}
```

### `POST /api/events`
Creates a new event. Supports both JSON body and `multipart/form-data`.

**Payload**:
```json
{
  "title": "Next.js Conf 2026",
  "description": "Global Next.js gathering",
  "overview": "Keynotes, Turbopack, and more",
  "location": "Bangalore, INDIA",
  "venue": "BIEC Centre",
  "date": "2026-11-12",
  "time": "09:30 AM",
  "mode": "Hybrid",
  "audience": "Frontend & Full-Stack Developers",
  "organizer": "Vercel Community",
  "tags": ["Next.js", "React", "Turbopack"],
  "agenda": ["Opening Keynote", "Deep Dive"],
  "image": "/images/event4.png"
}
```

### `GET /api/events/[slug]`
Returns the full details for a single event by slug.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
