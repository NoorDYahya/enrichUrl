# Enriched URLs Display

This project is a React application that fetches and displays enriched URL data from external APIs. It allows users to search for URLs based on country and view detailed information about each URL.

## Features

- **Navbar**: Provides a search bar to filter URLs by country.
- **UrlsList**: Displays a list of enriched URLs, grouped and sorted by country.
- **Error Handling**: Shows error messages if data fetching fails.
- **Bootstrap Integration**: Utilizes Bootstrap for responsive design and styling.

## Components

### `Navbar.jsx`

The `Navbar` component provides a search interface for filtering URLs by country. It contains:

- **Search Bar**: Users can input a search term to filter URLs.
- **Submit Button**: Triggers the search based on the input term.

### `UrlItem.jsx`

The `UrlItem` component displays individual URL details in a card format using Bootstrap classes. Each card shows:

- **URL**: A clickable link to the URL.
- **Name**: The name associated with the URL.
- **Employees**: Estimated number of employees.
- **Annual Revenue**: Annual revenue of the associated entity.
- **Country**: Country of the entity.

### `UrlsList.jsx`

The `UrlsList` component manages the display of enriched URLs. It:

- **Filters URLs**: Based on the search term provided by the `Navbar`.
- **Groups URLs**: By country.
- **Sorts URLs**: Within each country group by estimated number of employees.

### `App.js`

The main application component that:

- **Fetches Data**: Retrieves URL data and enrichment details from external APIs.
- **Processes Data**: Extracts, enriches, and stores URL data.
- **Handles Errors**: Displays error messages if fetching data fails.
- **Renders Components**: Displays the `Navbar` and `UrlsList` components.

## Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/enriched-urls-display.git
   cd enriched-urls-display
   ```

2. **Install Dependencies**

   Make sure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

3. **Start the Application**

   ```bash
   npm start
   ```

## Backend

A backend was implemented to handle data storage and management; however, it was found to be unnecessary for this simple case. The application directly fetches data from external APIs and processes it on the frontend.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Bootstrap**: For responsive design and styling.
- **Fetch API**: For retrieving data from external sources.

### Backend

- **Express**: For building the user interface.
- **mongoose**: For responsive design and styling.
- **multer**: For retrieving data from external sources.

## Data Handling

- **Missing URLs**: Handled cases where URLs were missing in the messages.json file by providing appropriate warnings and fallback values.
- **Missing Data**: Managed situations where enrichment data was missing in data.json by setting default values and ensuring that the application remains functional.

## APIs

- **URLs API**: https://cdn.taboola.com/mobile-config/home-assignment/messages.json
- **Enrichment API**: https://cdn.taboola.com/mobile-config/home-assignment/data.json

mongodb endpoint but where not used in this case:

- **saveuRL**: http://localhost:3000/urls/saveEnrichedUrl
- **getUrl**: http://localhost:3000/urls/getEnrichedUrl

## Notes

- The application is designed to handle and display data dynamically based on the JSON files provided.
- Bootstrap is used for styling and layout, ensuring the application is responsive and visually appealing.
