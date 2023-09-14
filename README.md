# Movie Box

MovieBox is a web application that allows users to discover and explore movies. With MovieBox, you can search for movies by title, view movie details, and save your favorite movies. This application makes use of the TMDB API to provide up-to-date movie data.

Live site here -> [MovieBox](https://movie-box-gamma.vercel.app/)

## Features
- Browse the top 10 movies on the homepage.
- Search for movies by title.
- View detailed information about a specific movie, including title, release date, runtime, and overview.

## Technologies Used
- React
- TMDB API
- Tailwind CSS 
- React Router (for routing between pages)

## Setup
To run the MovieBox web application locally, follow these steps:

Clone the repository to your local machine:
```bash
git clone https://github.com/Jonnie-Dev/moviebox.git
```
Navigate to the project directory:
```bash
cd moviebox
```
Install the project dependencies:
```bash
npm install
```
Create a .env file in the root of your project to store your TMDB API key:
```
makefile
REACT_APP_TMDB_API_KEY=your-tmdb-api-key
```
Replace your-tmdb-api-key with your actual TMDB API key.

Start the development server:
```bash
npm run dev
```
Open your web browser and access the application at `http://localhost:5173`.

## Usage
On the homepage, you will find the top 10 movies displayed in a grid layout with movie posters, titles, and release dates.
Use the search feature to search for movies by title. The search results will include movie posters, titles, and release dates.
Click on a movie card to view detailed information about that movie, including title, release date, runtime, and overview.

## Deployment
You can deploy the MovieBox web application to a hosting platform of your choice, such as GitHub Pages, Netlify, or Vercel. Ensure that you configure the deployment settings according to the platform's requirements.

## Error Handling
The application implements error handling to display meaningful error messages to users in case of API failures or other issues.
