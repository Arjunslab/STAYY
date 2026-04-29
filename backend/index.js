import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


dotenv.config(); 


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_ID);
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
   console.log("RECEIVED TOKEN:", token);
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const jwtToken = jwt.sign(
      { name, email, picture },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      user: {
        name,
        email,
        avatar: picture,
        phone: null
      },
    });



  app.post("/update/to/database", (req, res) => {
    const { email, phone, token } = req.body;
    console.log("Received data:", email, phone);
    // set email&& phone ? res.json({ message: "Data received successfully" }) : res.status(400).json({ error: "Email and phone are required" });

  });
   catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});







app.get("/account", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      picture: decoded.picture,
      name: decoded.name || "John Doe",
      email: decoded.email,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});



app.listen(process.env.PORT || 5000, () => {
  console.log("Server running ");
});



