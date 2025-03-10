require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const allowedOrigins=[
    "https://kle-frontend-mu.vercel.app/",
    "https://kle-frontend-git-main-bhumikas-projects-5ae9126a.vercel.app/",
    "https://kle-frontend-5a3bbyey2-bhumikas-projects-5ae9126a.vercel.app/"
];

const app = express();
app.use(express.json());
app.use(cors(
        {
            origin: function (origin, callback) {
              if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
              } else {
                callback(new Error("Not allowed by CORS"));
              }
            },
            credentials: true, // Allows cookies and authentication headers if needed
          }

    
))

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/checkout", require("./routes/paymentRoutes"));
app.get('/',(req,res)=>{
    res.send("getting the server")
})

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
