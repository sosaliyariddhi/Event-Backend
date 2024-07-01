import "dotenv/config";
import app from "./app.js";

import { PORT } from "./config.js";
import { connectDB } from "./db/dbConfig.js";

const port = PORT || 3000;

connectDB().then(() => {
    console.log("DB Connected Successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.log("DB Connection Failed", err);
});
