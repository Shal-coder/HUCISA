# Antidrug Club Website

This is a full-stack website for the Antidrug Club, built with Node.js, Express, MySQL, and EJS.

## Prerequisites

- Node.js installed
- MySQL Server installed and running

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Database Setup**
    - Create a MySQL database named `antidrug_club_db`.
    - You can use the following SQL command in your MySQL client:
      ```sql
      CREATE DATABASE antidrug_club_db;
      ```
    - Update the `.env` file with your MySQL credentials (username and password).

3.  **Run the Application**
    ```bash
    npm start
    ```
    Or for development with auto-restart:
    ```bash
    npm run dev
    ```

4.  **Access the Website**
    Open your browser and go to `http://localhost:3000`.

## Project Structure

- `app.js`: Main application entry point.
- `config/db.js`: Database connection configuration.
- `routes/`: Route handlers.
- `views/`: EJS templates for the frontend.
- `public/`: Static files (CSS, images, JS).
