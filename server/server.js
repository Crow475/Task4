const port = process.env.PORT || 5000;
const express = require('express');
const { json } = require("express")
const Sequelize = require("sequelize");
const cors = require("cors");

const app = express();

const sequelize = new Sequelize(
 'test_db',
 'express_server',
 'Ng323MBb#w',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

app.use(json());
app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
