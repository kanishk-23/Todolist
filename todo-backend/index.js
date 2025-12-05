const cors = require('cors');
const routes = require('./routes/todoroutes');
const DBconnection = require('./databaseconnection');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const express  = require('express');
const app = express();
app.use(cors({origin: `*`}));
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
