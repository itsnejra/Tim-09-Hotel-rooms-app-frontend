# Hotel Rooms App — Frontend

Next.js frontend for a hotel room reservation and management platform. Connects to the [Tim-09-Hotel-rooms-app](https://github.com/itsnejra/Tim-09-Hotel-rooms-app) backend. Containerised with Docker.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/auth/login` | User login |
| `/auth/register` | User registration |
| `/rooms` | Room listing and browsing |
| `/rooms/addroom` | Add a new room (admin) |
| `/admin/listusers` | User management (admin) |
| `/admin/adduser` | Add user (admin) |
| `/admin/edituser` | Edit user (admin) |
| `/info/aboutus` | About page |
| `/info/contact` | Contact page |

## Running locally

```bash
cd hotelrooms
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running with Docker

```bash
cd hotelrooms
docker compose up --build
```

## Environment variables

Copy `.env.example` to `.env` and set the backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Tech stack

- **Next.js** — React framework with file-based routing
- **React** — UI library
- **Docker / Docker Compose** — containerisation
