const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const recommendationRoutes = require('./routes/recommendations');
const salesRoutes = require('./routes/sales');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/sales', salesRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});