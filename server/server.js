const express = require('express');
const bodyParser  = require('body-parser');
const cors   = require('cors');


//app
const app = express();

const corsOptions = {
  // origin: "http://localhost:8081"
  // origin: "http://127.0.0.1:5173"
  origin: '*'
};

app.use(cors(
  corsOptions
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user_info.routes')(app);
require('./routes/user.routes')(app);
require('./routes/sciense_work.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



//database
const db = require("./models");
const Role = db.role;
db.sequelize.sync({ alter: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


function initial() {
  // Role.create({
  //   id: 1,
  //   name: "user"
  // });
 
  // Role.create({
  //   id: 2,
  //   name: "moderator"
  // });
 
  // Role.create({
  //   id: 3,
  //   name: "admin"
  // });
}