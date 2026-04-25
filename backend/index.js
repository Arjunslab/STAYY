import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const SECRET = "your_jwt_secret_key";

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: [
             "http://localhost:5173",
             "https://stayy.bajpai.dev"
            ],
    credentials: true,
  })
);

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
    const token = jwt.sign(
    { email },          // payload
    SECRET,             // secret
    { expiresIn: "7d" } // expiry
  );

  console.log(name, email, password);

  res.json({
    token: token,
    user: {
      name,
      email,
      avatar: "https://avatars.githubusercontent.com/u/166507445?v=4&size=64"
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});