const express = require('express');
const cors = require('cors');

const app = express();

const contactsRouter = require('./app/routes/contactRoute');
const ApiError = require('./app/api-error');

app.use(cors());
app.use(express.json());

app.use('/api/contacts/', contactsRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to contact book application.",
    })
})

app.use((req, res, next) => {
    // Khi khong co endpoint duoc goi thi vao day
    return next(new ApiError(404, "Resource not found"));
})

// Error handling
app.use((err, req, res, next) => {

    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    })
})

module.exports = app;
