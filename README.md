# AI Travel Planner

An AI-powered travel planning application that helps users create personalized trip itineraries based on their preferences, budget, and travel dates.

[Watch the showcase video](https://www.youtube.com/watch?v=I3TibSA7qTo)

## Features

- **AI-Generated Trip Plans**: Leverages Google's Gemini 2.0 Flash to create personalized travel itineraries
- **Google Places Integration**: Provides real-time information about locations, hotels, and attractions
- **Google Authentication**: Secure user authentication using Google OAuth
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices
- **Firebase Integration**: Cloud-based storage for saving and retrieving trip plans
- **Budget-Conscious Recommendations**: Customized suggestions based on budget preferences
- **Interactive Maps**: View recommended locations on interactive maps

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Google OAuth via @react-oauth/google
- **Database**: Firebase Firestore
- **APIs**:
  - Google Places API
  - Google Maps API
  - Google Generative AI (Gemini 2.0 Flash)
- **Routing**: React Router v7
- **State Management**: React Hooks (useState, useEffect)
- **Notifications**: Sonner for toast notifications

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google API keys (Places, Maps, OAuth, Generative AI) Preferred Gemini AI Key
- Firebase project with Firestore enabled

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-travel-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_GOOGLE_PLACE_API_KEY=your_google_place_api_key
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
   VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
   ```

4. Create a Firebase configuration file at `src/service/firebaseConfig.js`:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "your_firebase_api_key",
     authDomain: "your_project.firebaseapp.com",
     projectId: "your_project_id",
     storageBucket: "your_project.appspot.com",
     messagingSenderId: "your_messaging_sender_id",
     appId: "your_app_id"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

1. **Home Page**: Click "Get Started Here" to begin planning your trip
2. **Create Trip Page**: Fill in your travel preferences:
   - Destination
   - Number of days
   - Budget (Cheap, Moderate, or Luxury)
   - Number of travelers
3. **Generate Trip**: Click the "Generate Trip" button to create your personalized itinerary
4. **View Trip**: Review your AI-generated travel plan, including:
   - Hotel recommendations
   - Daily activities with timeframes
   - Places to visit with details and maps

## Project Structure

- `/src`: Source code
  - `/components`: UI components
    - `/ui`: shadcn/ui components
    - `/ui/custom`: Custom components
  - `/constants`: Application constants and configuration
  - `/create-trip`: Trip creation workflow
  - `/view-trip`: Trip viewing and management
  - `/service`: API and service integrations
  - `/assets`: Static assets
  - `/lib`: Utility functions

## API Documentation

### Google Places API

Used for location autocomplete and retrieving place details:
```javascript
// Example usage in src/service/GlobalApi.jsx
const BASE_URL='https://places.googleapis.com/v1/places:searchText'
```

### Google Generative AI (Gemini)

Used for generating personalized travel plans:
```javascript
// Example usage in src/service/AIModal.jsx
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
```

### Firebase Firestore

Used for storing and retrieving trip data:
```javascript
// Example usage in src/view-trip/[tripId]/index.jsx
const docRef = doc(db, 'Travel-Planner', tripId);
const docSnap = await getDoc(docRef);
```

## Roadmap

- [ ] Add trip editing capabilities
- [ ] Implement trip sharing via social media
- [ ] Add multi-destination trip planning
- [ ] Create user profile and trip history page
- [ ] Add offline support for viewing existing trips

## Credits and Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/docs/components/dialog) - UI components
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) - Google authentication
- [Firebase](https://firebase.google.com/docs/firestore/manage-data/add-data) - Database
- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/text-search)

---

## Notes

- API keys are not provided in the public repository for security reasons
- For any issues or feature requests, please open an issue in the repository
