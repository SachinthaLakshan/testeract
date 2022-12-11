require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoute = require('./routes/userRoute.js');

const connectDB = require('./config/db');
const path = require('path');

connectDB();
const app = express();
//app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());
app.use(cors());

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

//connect
// mongoose.connect(
//   process.env.MONGO_URI,
//   {
//     useNewUrlParser: true,

//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log('DB conneted!!');
//   }
// );

app.use('/', UserRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
