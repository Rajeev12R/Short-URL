# URL Shortener

This is a simple URL shortener application built with Node.js and MongoDB.

## Features

- Shorten long URLs into manageable short links.
- Redirect users to the original URL when accessing the short link.
- Track visit history for each shortened URL.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure MongoDB connection in `index.js`.
4. Start the server using `npm start`.

## Usage

- Send a POST request to `/url/shorten` with a JSON body containing the original URL to shorten it.
- Access the shortened URL with the generated short ID to be redirected to the original URL.
- Retrieve URL analytics by sending a GET request to `/url/analytics/:shortId`.

## Dependencies

- Express.js
- Mongoose
