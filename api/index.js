import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import countryRoutes from './routes/country.route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('MongoDB is connected');
}).catch(err => {
  console.log(err);
})

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/country', countryRoutes);

app.use(express.static(path.join(__dirname, '/collections/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/collections/dist/index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});