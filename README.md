# Farmart Frontend

## Overview
Farmart Frontend is a React-based web application that connects farmers directly with buyers.  
It works hand-in-hand with the [Farmart Backend](https://github.com/okukubrianokoth/Farmart-Backend) to eliminate middlemen and allow farmers to sell their livestock or farm produce directly to consumers.

The app provides a smooth, responsive, and intuitive interface for both farmers and buyers — enabling them to register, view listings, order animals, make payments, and manage profiles all in one place.

Repository Name: **Farmart-Frontend**  
Backend Repository: **Farmart-Backend**  
GitHub Username: **okukubrianokoth**

---

## Table of Contents
1. Project Description  
2. Features  
3. Tech Stack  
4. Project Structure  
5. Getting Started  
6. Environment Variables  
7. Running the App  
8. Testing  
9. Deployment  
10. Contributors  
11. Contact & Location  
12. License

---

## Project Description

Farmart Frontend provides a user-friendly interface for the Farmart ecosystem.  
It allows farmers to list animals for sale and manage inventory, while buyers can easily browse listings, filter by type or breed, and make secure payments using M-Pesa.  

The frontend communicates with the Flask backend via REST APIs, ensuring real-time data updates and secure transactions.  
Built with React + Redux Toolkit, the app is fully responsive and optimized for both desktop and mobile experiences.

---

## Features

### Farmer
- Create an account and log in securely  
- Upload animals for sale (integrated with Cloudinary for images)  
- Edit and manage animal listings  
- Track orders and approve buyer requests  
- Receive payment confirmations  

### Buyer
- Register and log in securely  
- Browse all animals listed for sale  
- Search and filter animals by breed, type, or price  
- Add items to cart and checkout securely  
- Pay using integrated M-Pesa  
- Receive order status updates  

### General System
- Responsive UI (mobile + desktop)  
- State management using Redux Toolkit  
- API integration with backend Flask app  
- Toast notifications and loading spinners  
- Role-based routing and protected pages  
- Form validation and error handling  
- Deployed frontend on Render (or Netlify/Vercel)  

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend Framework | React.js |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| API Calls | Axios |
| Routing | React Router v6 |
| Authentication | JWT Tokens (from backend) |
| Forms | React Hook Form |
| Deployment | Render / Netlify |
| Version Control | Git + GitHub |

---

## Project Structure

```
Farmart-Frontend/
│
├── src/
│   ├── api/
│   │   └── apiClient.js          # Axios instance configuration for API requests
│   │
│   ├── assets/                   # Images, logos, and static assets
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation bar component
│   │   ├── Footer.jsx            # Footer component
│   │   ├── ProtectedRoute.jsx    # Wrapper for protected routes
│   │   └── Loader.jsx            # Loading spinner
│   │
│   ├── features/                 # Redux slices for global state management
│   │   ├── authSlice.js          # Manages authentication and user state
│   │   ├── animalSlice.js        # Handles animals listing, filtering, and uploads
│   │   ├── orderSlice.js         # Manages cart and order-related actions
│   │   └── paymentSlice.js       # Handles M-Pesa payment flow
│   │
│   ├── pages/                    # Main app pages
│   │   ├── Home.jsx              # Homepage with featured listings
│   │   ├── Animals.jsx           # Displays all animals for sale
│   │   ├── AnimalDetail.jsx      # Detailed view for each animal
│   │   ├── AddAnimal.jsx         # Form for farmers to upload animals
│   │   ├── Orders.jsx            # Buyer and seller order views
│   │   ├── Login.jsx             # User login page
│   │   ├── Register.jsx          # User registration page
│   │   └── Profile.jsx           # User dashboard/profile management
│   │
│   ├── App.jsx                   # Root component with all routes
│   ├── main.jsx                  # React entry point
│   ├── store.js                  # Redux store configuration
│   └── index.css                 # Global styles
│
├── public/
│   ├── index.html                # Main HTML entry file
│   └── favicon.ico               # App icon
│
├── .env.example                  # Example environment variables
├── package.json                  # Project dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.js                # Vite configuration for development
└── README.md                     # Project documentation (this file)
```

---

## Environment Variables

Create a `.env` file at the root of your project:

```
VITE_API_URL=https://farmart-backend.onrender.com/api
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<cloud_name>/image/upload
```

---

## Running the App

```bash
# 1. Clone the repository
git clone https://github.com/okukubrianokoth/Farmart-Frontend.git
cd Farmart-Frontend

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Update API URLs and keys if needed

# 4. Run development server
npm run dev
```

Then open your browser and go to:  
**http://localhost:5173/**

---

## Testing

Farmart Frontend uses Jest and React Testing Library for unit and component testing.

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

---

## Deployment

You can deploy easily on Render, Netlify, or Vercel.

For example, on Netlify:

```bash
# Build project for production
npm run build
# Deploy the "dist" folder manually or via Netlify CLI
netlify deploy --prod
```

---

## Contributors

| Name | Role | GitHub |
|------|------|--------|
| Brian Okuku | Frontend Developer / Lead | [@okukubrianokoth](https://github.com/okukubrianokoth) |
| Edward Karogo | Developer | — |
| Ezra Radai | Developer | — |
| Hussein Chegu | Developer | — |

---

## Contact & Location

**Location:** Ngong Road, Nairobi, Kenya  
**Phone:** 0793459226  
**Email:** okukubrian743@gmail.com  

---

## License

```
MIT License

Copyright (c) 2025
Brian Okuku, Edward Karogo, Ezra Radai, and Hussein Chegu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---
