const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());


app.use('/api/apartments', require('./routes/apartment'));
app.use('/api/buildings', require('./routes/building'));
app.use('/api/houses', require('./routes/house'));
app.use('/api/lands', require('./routes/land'));
app.use('/api/users', require('./routes/user'));


app.use(errorHandler);


app.get('/', (req, res) => {
  res.json({message:'Hello, World!'});
});


connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
