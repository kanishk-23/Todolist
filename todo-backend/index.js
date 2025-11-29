const cors = require('cors');
const express  = require('express');
const routes = require('./routes/todoroutes');
const dotenv = require('dotenv');
const DBconnection = require('./databaseconnection');
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use your routes (all under /api/todos for example)
app.use('/api/todos', routes);

// root route
app.get('/', (req, res) => {
  res.json({ message: 'API is live' });
});

(async () => {
  await DBconnection();
  app.listen(port, () => console.log(`Server running on port ${port}`));
})();
