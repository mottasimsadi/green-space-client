# 🌿 Gardening Community & Resource Hub

A full-stack platform for gardening enthusiasts to share tips, connect with local gardeners, and explore gardening resources. Built with React.js, Firebase Authentication, and MongoDB.

## 🔗 Live Links
- **Client:** [Netlify Live Site](https://green-space-hub.netlify.app/)
- **Server:** [Vercel API](https://green-space-server.vercel.app/)

## ✨ Key Features
- 🔐 Firebase Authentication (Email/Password & Google Sign-In)
- 🌱 CRUD operations for garden tips with MongoDB
- 🔥 Trending tips section sorted by likes
- 👩‍🌾 Active gardener profiles with status filtering
- 🌗 Dark/Light theme toggle functionality
- 👍 Like functionality with real-time updates
- 📱 Fully responsive design for mobile and desktop
- 🎨 Custom animations with React Awesome Reveal
- 📌 React Tooltip for interactive elements
- 📊 Advanced filtering by difficulty level
- ✉️ Toast notifications for user actions

## 🛠️ Tech Stack
### Frontend
- React.js
- React Router
- Firebase Authentication
- Tailwind CSS + DaisyUI
- React Icons
- React Toastify
- React Awesome Reveal
- React ToolTip

### Backend
- Node.js
- Express.js
- MongoDB
- CORS
- Vercel Serverless Functions

## 📂 Project Structure
```
gardening-app/
├── public/            			         # Static assets
├── src/
│   │
│   ├── components/    			         # Reusable components like Navbar, TipsDetails
│   ├── contexts/      			         # Theme and auth contexts
│   ├── data/gardeners.json	             # gardeners.json data
│   ├── firebase/firebase.config.js      # Firebase config
│   ├── layouts/MainLayout.jsx           # Main application logic
│   ├── pages/         			         # Route-based page components
│   └── routes/        			         # Route configuration (Protected and public route setup)
```

## 🚀 Getting Started
1. Clone both repositories:
```bash
git clone https://github.com/mottasimsadi/green-space-client
git clone https://github.com/mottasimsadi/green-space-server
```

2. Install dependencies for both:
```bash
cd green-space-client && npm install
cd ../green-space-server && npm install
```

3. Set up environment variables:

**Client (.env.local):**
```
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage
VITE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_APP_ID=your_firebase_app_id
```

**Server (.env):**
```
DB_USER=db_username
DB_PASS=db_password
```

4. Run development servers:
```bash
# Client
npm run dev

# Server
nodemon index.js
```

## 🌿 API Endpoints
| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | /tips                    | Get all tips (filter with ?status=Public) |
| GET    | /tips/trending           | Get top 6 trending tips          |
| GET    | /tips/:id                | Get single tip by ID             |
| POST   | /tips                    | Create new tip                   |
| PATCH  | /tips/:id                | Update tip by ID                 |
| DELETE | /tips/:id                | Delete tip by ID                 |
| PATCH  | /tips/:id/like           | Increment tip's like count       |
| GET    | /tips/user/:email        | Get tips by creator email        |

## 🎨 Design Highlights
- **Interactive Slider**: Built with Swiper.js for smooth transitions
- **Theme Toggle**: Persistent dark/light mode using Context API
- **Animated Elements**: React Awesome Reveal for scroll animations
- **Responsive Layout**: Tailwind CSS for all device sizes
- **Custom 404 Page**: Themed gardening illustration with navigation

## 🏆 Challenges Implemented
- **Advanced Filtering**: Dynamic difficulty level filtering on Browse Tips page
- **Theme Toggle**: Full dark/light mode support with localStorage persistence
- **Like Functionality**: Real-time like updates with user validation

**Bonus Integrations:**
- React Awesome Reveal for animations
- React Tooltip for interactive elements
