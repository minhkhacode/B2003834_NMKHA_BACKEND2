const app = require('./app.js');
const config = require('./app/config');
const MongoDB = require('./app/utils/mongodb.util.js');
const dotenv = require('dotenv');

async function startServer() {
    try {
        dotenv.config();

        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");
    
        // start server
        const PORT = config.app.port;
    
        app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        })
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();