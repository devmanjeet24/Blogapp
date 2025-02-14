const express = require('express');
const mongoose = require('mongoose'); // Corrected import
const bodyParser = require('body-parser');
const homeRoutes = require('./routers/home');

const app = express();
const port = process.env.PORT || 8080;

// Corrected database connection
mongoose.connect("mongodb://127.0.0.1:27017/studentdetails", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {  // Corrected event name
    console.log("Connection Error:", err);
});
db.once('open', () => {
    console.log("MongoDB Connected Successfully!");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', homeRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
