const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');


const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config 

const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongodb connected...'))
  .catch(err => console.log(err));

// Use routes

app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  // Any request will send index.html to the client
  // Which is in the build folder we generate
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
