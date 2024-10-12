import express from 'express';
import cors from 'cors'; // Import the cors middleware
require('dotenv').config()
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';

const app = express();

const port = process.env.PORT;


// undefined req bodies for POST and PUT debugged
app.use(express.json());
// Enable CORS for all routes
app.use(cors()); // This will allow all origins

app.use('/ystore', userRoutes);
app.use('/ystore', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});