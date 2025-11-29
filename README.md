# Steps followed for project setup.

# Frontend: React, Axios, HTML, CSS
# Backend: Node.js, Express, REST API
# Other: Git, npm

# Project setupproject-root/
  backend/
    package.json
    controllers/
      ...controller files
    models/
      ...Mongoose data models
    routes/
      ...route definition files
    databaseConnection.js   # MongoDB connection
    index.js                # Express server entry point
    .env                    # Environment variables (not committed) `MONGO_URI` and `local server Port`
    .gitignore              # Files/folders to ignore in Git

  frontend/
    package.json
    src/
      components/
        ...UI components / cards
      services/
        ...API service file(s) using Axios
      App.js
      index.js


# Create two seperate folders for backend and frontend in order to keep your project clean.

# for front-end folder
npx create-react-app <frontend folder name>
cd .\<frontend folder name>\
npm install axios
npm start

# now connect backend with front end using axios and backend url for configuring api calls.
# your frontend is live.



# for backend folder create a folder and run
npm init -y
# run `npm install <dependencies>` (node express mongodb etc.)
npm install express cors dotenv mongoose mpngodb 
npm install --save-dev nodemon
# now configure and connect with mongodb and 
npm run dev