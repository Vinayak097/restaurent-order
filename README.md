# The Digital Diner - Restaurant Ordering System

A full-stack web application for a restaurant ordering system built with the MERN stack (MongoDB, Express, React, Node.js) and PostgreSQL. This application allows users to browse menu items, add them to a cart, place orders, and view order history.

## Live Demo

Frontend: [https://digital-diner.netlify.app](https://digital-diner.netlify.app)

Backend: [https://digital-diner-api.onrender.com](https://digital-diner-api.onrender.com)

## Features

- **Menu Display**: Browse menu items by category (Appetizers, Main Courses, Desserts, Drinks)
- **Shopping Cart**: Add items to cart, update quantities, remove items
- **Order Placement**: Simple checkout with name and phone number
- **Order History**: View past orders associated with your phone number
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Infinite Scrolling**: Load more menu items as you scroll

## Database Design

This project uses both MongoDB and PostgreSQL databases:

### MongoDB (Menu Items)

MongoDB was chosen for menu items because:
- Menu items have flexible schema requirements (different items may have different attributes)
- Menu data is read-heavy with less frequent updates
- The document structure allows for easy embedding of related data (like ingredients, nutritional info)
- It's well-suited for storing and retrieving product catalogs

### PostgreSQL (Users and Orders)

PostgreSQL was chosen for users and orders because:
- Order data has clear relational structure (users have orders, orders have items)
- Transactions are critical for order processing (ensuring all order items are saved)
- Complex queries are needed for order history and reporting
- Strong data integrity is required for financial transactions
- ACID compliance ensures data consistency

## API Endpoints

### Menu Endpoints

- `GET /menu` - Get all menu items (with optional category, pagination)
- `GET /menu/:id` - Get a specific menu item by ID

### User Endpoints

- `POST /user` - Create a new user or authenticate existing user
- `GET /user/:phoneNumber` - Get user details by phone number

### Order Endpoints

- `POST /order` - Create a new order (requires authentication)
- `GET /order/getallorders` - Get all orders for the authenticated user
- `GET /order/getorder/:id` - Get a specific order by ID

## Tech Stack

### Frontend
- React (with Vite)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (with Mongoose)
- PostgreSQL (with Prisma ORM)
- JWT Authentication

## Local Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- PostgreSQL

### Backend Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/digital-diner.git
   cd digital-diner
   ```

2. Install dependencies
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/digital_diner
   MONGO_DB=mongodb://localhost:27017/digital_diner
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Set up the PostgreSQL database
   ```
   npx prisma migrate dev
   ```

5. Seed the database with initial data
   ```
   npm run seed
   ```

6. Start the backend server
   ```
   npm run dev
   ```

### Frontend Setup

1. Install dependencies
   ```
   cd frontend
   npm install
   ```

2. Start the frontend development server
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Backend Deployment
The backend is deployed on Render.com. To deploy your own instance:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to `npm install && npm run build`
4. Set the start command to `npm start`
5. Add the environment variables from the `.env` file

### Frontend Deployment
The frontend is deployed on Netlify. To deploy your own instance:

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Add environment variables if needed

## Assumptions and Challenges

### Assumptions
- Users are identified by their phone number (no email required)
- Simple authentication without password (token-based)
- Menu items have fixed prices (no customizations or add-ons)
- Orders are for pickup only (no delivery options)

### Challenges
- Integrating two different databases (MongoDB and PostgreSQL)
- Managing authentication without traditional login
- Ensuring data consistency between databases
- Implementing infinite scrolling with category filtering

## Future Improvements

- Add user authentication with passwords
- Implement admin panel for managing menu items
- Add payment processing integration
- Implement real-time order status updates
- Add delivery options with address input
- Enhance menu items with customization options
- Add search functionality for menu items

## License

This project is licensed under the MIT License - see the LICENSE file for details.
