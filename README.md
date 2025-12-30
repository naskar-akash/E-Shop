# E-Shop

A simple e-commerce example project with a Node/Express backend and a React + Vite frontend (includes an Admin UI). It demonstrates user authentication, cart & orders, and basic product CRUD.

## Table of contents
- [Project structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Installation & run](#installation--run)
- [Scripts](#scripts)
- [API (overview)](#api-overview)
- [Frontend usage notes](#frontend-usage-notes)
- [Deployed version](#deployed-version)
- [Developed By](#developed-by)

## Project structure
- `backend/` — Express API, MongoDB models, controllers, routes
- `frontend/` — Public React storefront (Vite)
- `admin/` — Admin React app (Vite) for product management

## Features
- Product listing and details
- User auth (register/login/logout)
- Address management
- Cart: add, update quantity, remove
- Orders: place and view orders
- Admin: create, update, remove products

## Prerequisites
- Node.js v18+ and npm
- MongoDB (connection URI)

## Environment variables
Create `.env` files for `backend` and, if needed, for `frontend` (Vite) environment variables.

Example `.env` for backend (`backend/.env`):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/e-shop
JWT_SECRET=your_jwt_secret_here
```

Example `.env` for frontend (`frontend/.env`):

```
VITE_SERVER_URL=http://localhost:3000
```

Note: Vite uses `VITE_` prefix for client-side env vars.

## Installation & run
1. Backend

```bash
cd backend
npm install
npm run dev   # runs nodemon app.js (dev server)
```

2. Frontend (store)

```bash
cd frontend
npm install
npm run dev   # runs vite dev server (usually on http://localhost:5173)
```

3. Admin UI

```bash
cd admin
npm install
npm run dev
```

Adjust ports via `.env` if needed.

## Scripts
- Backend: `npm run dev` (nodemon for development)
- Frontend: `npm run dev`, `npm run build`, `npm run preview`
- Admin: same as frontend

## API (overview)
Main endpoints (default base: `http://localhost:3000`):

- Products
  - `GET /product/` — public, list products
  - `GET /product/:id` — public, product detail

- User
  - `POST /register` — create user
  - `POST /login` — login
  - `POST /logout` — logout
  - `GET /profile` — get user profile (auth)
  - `POST /address` — set address (auth)

- Cart (auth)
  - `POST /cart/items` — add item (body: `{ productId, quantity }`)
  - `GET /cart` — get current user's cart
  - `PATCH /cart/items/:itemId` — update quantity
  - `DELETE /cart/items/:itemId` — remove item

- Orders (auth)
  - `POST /order/:id` — place order
  - `GET /order` — list orders
  - `DELETE /order/:id` — cancel/remove order

- Admin (protected)
  - `POST /admin/create` — create new product (multipart/form-data)
  - `DELETE /admin/remove/:id` — remove product

> Check controller files in `backend/controllers` for full request/response shapes.

## Frontend usage notes
- `frontend/src/Components/Services/ProductServices.jsx` contains product API calls.
- `frontend/src/Components/Services/UserServices.jsx` contains auth/cart/order calls.
- Vite frontend expects `VITE_SERVER_URL` to point at the backend.

## Deployed version
- Click to this link [https://e-shop-online-akash.app](https://e-shop-fmhh-3ls3a9lme-naskar-akashs-projects.vercel.app/) to see how this app works

## Developed By
Akash Naskar
