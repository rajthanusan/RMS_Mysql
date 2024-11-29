const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');   
require('dotenv').config();
const sequelize = require('./config/database');

const PORT = process.env.PORT || 5000;

  
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",   
  database: process.env.DB_NAME,
});
 
  
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);   
  } else {
    console.log('Connected to MySQL database');
  }
});

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const imageRoutes = require('./routes/imageRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const mailRoutes = require('./routes/mailRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

 app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
 app.use('/api', bookingRoutes);
 app.use('/api', eventRoutes);
 app.use('/api', reviewRoutes);
 app.use('/api/images', imageRoutes);
 app.use('/api', aboutRoutes);
 app.use('/api', serviceRoutes);
 app.use('/api/feedback', feedbackRoutes);
 app.use('/api/mail', mailRoutes);
 app.use('/api', subscribeRoutes);
 app.use('/api/rooms', roomRoutes); 

  
sequelize.sync()
    .then(() => {
        console.log("Database synced successfully!");
    })
    .catch((err) => {
        console.error("Error syncing the database:", err);
    });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
