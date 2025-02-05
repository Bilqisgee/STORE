import express from 'express';
import { connectDB } from './config/db.js'; // Importing database connection function
import productRoutes from "./routes/product.route.js"; // Importing product-related routes
import cors from 'cors'; // Importing CORS to handle cross-origin requests
import path from 'path'; // Importing path module to handle file paths
import { fileURLToPath } from 'url'; // Importing to convert module URL to file path
import { dirname } from 'path'; // Importing to get directory name from file path

// Define __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);  // Extract file name from URL
const __dirname = dirname(__filename); // Extracts directory name from file path

const app = express(); // Initialize Express application

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow only your frontend URL
    credentials: true, // If you need to send cookies or authentication headers
}));

app.use("/api/products", productRoutes); // Mounting product routes at /api/products

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve frontend build files

    // Handle any other routes by sending the main index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

// Generic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000; // Define server port, default to 5000 if not in environment variables

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`); // Log server start
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error); // Log any database connection errors
});