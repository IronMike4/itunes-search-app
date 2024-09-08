# iTunes Search Application

## Description

The iTunes Search Application is a React-based web app that allows users to search for music, movies, and other media from the iTunes API. The app provides functionalities to view search results, add items to a favourites list, and toggle between light and dark modes. The user interface is styled with Bootstrap for a responsive and modern look.

## Key Features

- **Search Functionality**: Users can search for various types of media (music, movies, etc.) using keywords.
- **Results Display**: View search results with detailed information such as artwork, track name, artist, and release date.
- **Favourites List**: Add and view favourite items.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Installation

To run this application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/IronMike4/itunes-search-app.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd itunes-search-app
   ```

3. **Set Up the Backend:**

- Navigate to the backend folder.
- Create a .env file in the backend directory with the following content:

  ```bash
  JWT_SECRET=your_jwt_secret_here
  PORT=5001
  USER_NAME=your_username_here
  USER_PASSWORD=your_password_here
  ```

- Install backend dependencies:
  ```bash
  cd backend
  npm install
  ```
- Start the backend server:
  ```bash
  npm start
  ```
  The server will run on http://localhost:5001.

4. **Set Up the Frontend:**

- Navigate back to the root directory of the project.
- Create a .env file in the frontend directory with the following content:

  ```bash
  REACT_APP_API_URL=http://localhost:5001/api
  REACT_APP_JWT_TOKEN=your_jwt_token_here
  ```

  - Install frontend dependencies:

  ```bash
  cd frontend
  npm install
  ```

  - Start the frontend development server:

  ```bash
  npm start
  ```

  The frontend application will open in your default web browser at http://localhost:3000.

## Usage

1. **Search for Content:** Use the search bar to enter a term and select a media type, then click "Search" to fetch results.
2. **View Results:** Browse through the results and view details.
3. **Add to Favourites:** Click "Add to Favourites" on any result card to add it to your favourites list.
4. **View Favourites:** Navigate to the "Favourites" section to view and manage your favourites.
5. **Toggle Dark Mode:** Use the "Dark Mode" button to switch between themes.

## Technologies Used

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express, JWT, Axios

## Running Unit Tests

### Backend Tests

The backend tests use Jest and Supertest to test the Express routes. Here's how to run them:

1. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

2. **Run the Tests:**

   ```bash
   npm test
   ```

   The backend tests include:

- **api.test.js:** Tests the /api/search endpoint to ensure it returns results with a valid token and handles errors for unauthorized requests.
- **auth.test.js:** Tests the /auth/login endpoint to ensure it returns a JWT token for valid credentials and handles invalid credentials correctly.

### Frontend Tests

The frontend tests use React Testing Library to test the React components. Here's how to run them:

1. **Navigate to the Frontend Directory**:

   ```bash
   cd frontend
   ```

2. **Run the Tests:**

   ```bash
   npm test
   ```

   The frontend tests include:

- **FavouriteList.test.js:** Tests that the FavouriteList component renders items correctly and handles the removal of favourites.
- **ResultsList.test.js:** Tests that the ResultsList component renders results correctly and adds items to the favourites list.
- **SearchBar.test.js:** Tests that the SearchBar component handles user input and calls the onSearch function with the correct parameters.

## Contact

[Michael Mahachi](mikhach@gmail.com)

## References

HyperionDev Express - Middleware Task(PDF)
What is Middleware in Express JS? | Node.js Tutorials for Beginners - [YouTube Video](https://www.youtube.com/watch?v=y18ubz7gOsQ)
