import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Resend } from "resend";
import connectDB from "./db.js";
import User from "./models/user.js";
import crypto from "crypto";
import { getOtpTemplate, getWelcomeTemplate } from "./emails/templates.js";

// 1. Run config first thing!
dotenv.config();
connectDB();

// 2. Initialize Resend here and assign it to a lowercase 'resend' variable
const resend = new Resend(process.env.RESEND_KEY || process.env.RESEND_API_KEY);

const otp = crypto.randomInt(100000, 1000000).toString();
const app = express();

// ... rest of your middleware (app.use) and routes ...

app.use(
  cors({
    origin: [
      "https://stayy.bajpai.dev",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.get("/", (req, res) => {
  res.send(
    "<h1>You shouldn't be here. Leave immediately.</h1>"
  );
});

// Google Auth
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId: sub,
      });
    }

    sendWelcomeEmail(name, email).catch((err) => {
      console.error("Failed to send welcome email:", err);
    });

    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
    };

    res.json({
      token: jwtToken,
      user: safeUser,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Invalid Google token",
    });
  }
});



app.post("/api/account/update-info", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const { phone, email, name } = req.body;

    // Only update fields that aren't blank

    if (phone?.trim()) {
      user.phone = phone.trim();
    }

    if (email?.trim()) {
      user.email = email.trim();
    }

    if (name?.trim()) {
      user.name = name.trim();
    }

    await user.save();

    res.json({
      message: "Information updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(401).json({
      error: "Invalid token",
    });
  }
});




// Account Route
app.get("/api/account", async (req, res) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("AUTH HEADER:", authHeader);
    console.log("TOKEN:", token);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone || null,
      points: user.points ?? 0,
      tier: user.tier || "Silver",
    });
  } catch (err) {
    console.error(err);

    res.status(401).json({
      error: "Invalid token",
    });
  }
});


// Auth middleware helper
async function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return null;
  }
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) { res.status(404).json({ error: "User not found" }); return null; }
    return user;
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

// Dashboard: Get user bookings
app.get("/api/dashboard/bookings", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;
    res.json(user.bookings || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Dashboard: Get featured stays
app.get("/api/dashboard/featured", async (req, res) => {
  res.json([
    {
      id: "FE-1",
      name: "Wildflower Lodge & Spa",
      location: "Shimla, India",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      price: "\u20B98,500/night",
      tags: ["Spa", "Mountain View"]
    },
    {
      id: "FE-2",
      name: "Havelock Island Cove",
      location: "Andaman & Nicobar Islands",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      price: "\u20B912,200/night",
      tags: ["Beachfront", "Luxury"]
    },
    {
      id: "FE-3",
      name: "Heritage Fort Palace",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      price: "\u20B99,800/night",
      tags: ["Heritage", "Pool"]
    }
  ]);
});

// Dashboard: Rate a completed booking
app.patch("/api/dashboard/bookings/:bookingId/rate", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;
    const { rating } = req.body;
    const booking = user.bookings.id(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    booking.rating = rating;
    await user.save();
    res.json({ message: "Rating saved", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to rate booking" });
  }
});

// Dashboard: Get saved places
app.get("/api/dashboard/saved", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;
    res.json(user.savedPlaces || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch saved places" });
  }
});

// Dashboard: Remove a saved place
app.delete("/api/dashboard/saved/:placeId", async (req, res) => {
  try {
    const user = await requireAuth(req, res);
    if (!user) return;
    user.savedPlaces = user.savedPlaces.filter(
      p => p._id.toString() !== req.params.placeId
    );
    await user.save();
    res.json({ message: "Removed from saved places" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove saved place" });
  }
});




app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email required",
      });
    }


    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "",
        email,
        emailOtp: otp,
        emailOtpExpires: new Date(
          Date.now() + 10 * 60 * 1000
        ),
      });
    } else {
      user.emailOtp = otp;
      user.emailOtpExpires = new Date(
        Date.now() + 10 * 60 * 1000
      );

      await user.save();
    }

    const verificationToken = jwt.sign(
  { email, otp },
  process.env.JWT_SECRET,
  { expiresIn: "10m" }
);

const verificationLink =
  `https://stayy.bajpai.dev/verify-email?token=${verificationToken}`;

    await sendOtpConsentEmail(
      user.name,
      email,
      otp,
      verificationLink
    );

    res.json({
      success: true,
      message: "OTP sent",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to send OTP",
    });
  }
});






app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    

    if (
      user.emailOtp !== otp ||
      !user.emailOtpExpires ||
      user.emailOtpExpires < Date.now()
    ) {
      return res.status(400).json({
        error: "Invalid or expired OTP",
      });
    }

    user.emailVerified = true;
    user.emailOtp = undefined;
    user.emailOtpExpires = undefined;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Verification failed",
    });
  }
});



async function sendOtpConsentEmail(name, email, otp) {
  try {
    const html = getOtpTemplate(name, otp);

    const finalHtml = html
      .replace(/{{name}}/g, name)
      .replace(/{{OTP}}/g, otp)
      

    await resend.emails.send({
      from: "STAYY <no-reply@stayy.bajpai.dev>",
      to: email,
      subject: "STAYY OTP Verification",
      html: finalHtml,
    });

    console.log("OTP consent email sent successfully.");

  } catch (err) {
    console.error("Failed to send OTP consent email:", err);
  }
}










async function sendWelcomeEmail(name, email) {
  try {
    const html = getWelcomeTemplate(name);
    const finalHtml = html.replace(
      "{{name}}",
      name
    );

    await resend.emails.send({
      from: "STAYY <welcome@stayy.bajpai.dev>",
      to: email,
      subject: "Welcome to STAYY 🎉",
      html: finalHtml,
    });

    console.log("Welcome email sent");
  } catch (err) {
    console.error(
      "Failed to send welcome email:",
      err
    );
  }
}























app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});