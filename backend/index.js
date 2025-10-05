// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const Project = require("./models/projectSchema");
// const User = require("./models/userSchema");

// const app = express();
// dotenv.config();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch((err) => console.log("MongoDB Connection Failed", err));

// // Create Project endpoint
// app.post("/createProject", async (req, res) => {
//   try {
//     const newProject = new Project(req.body);
//     await newProject.save();
//     res.status(201).json({ message: "Project saved successfully!" });
//   } catch (error) {
//     console.error('Error saving project:', error); // Log the error for debugging
//     res.status(400).json({ message: "Error saving project", error });
//   }
// });

// // Get All Projects endpoint
// app.get("/projects", async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.status(200).json(projects);
//   } catch (error) {
//     console.error('Error retrieving projects:', error); // Log the error for debugging
//     res.status(500).json({ message: "Error retrieving projects", error });
//   }
// });

// // User Signup endpoint
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, firstname, lastname, email, password } = req.body;
//     const newUser = new User({ username, firstname, lastname, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "Signup successful!" });
//   } catch (error) {
//     console.error('Error during signup:', error); // Log the error for debugging
//     res.status(400).json({ message: "Error during signup", error });
//   }
// });

// // User Login endpoint
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email, password });
//     if (user) {
//       res.status(200).json({ message: "Login successful!" });
//     } else {
//       res.status(401).json({ message: "Incorrect email or password" });
//     }
//   } catch (error) {
//     console.error('Error during login:', error); // Log the error for debugging
//     res.status(500).json({ message: "Error during login", error });
//   }
// });

// // Start server
// const PORT = 3001;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Project = require("./models/projectSchema");
const User = require("./models/userSchema");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

// Create Project endpoint
app.post("/createProject", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully!" });
  } catch (error) {
    console.error('Error saving project:', error); // Log the error for debugging
    res.status(400).json({ message: "Error saving project", error });
  }
});

// Get All Projects endpoint
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving projects", error });
  }
});

// User Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, role } = req.body;
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password,
      role: role || 'user' // <-- Save role, default to 'user'
    });
    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error for debugging
    res.status(400).json({ message: "Error during signup", error });
  }
});

// User Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, password, role });
    if (user) {
      res.status(200).json({ message: "Login successful!", role: user.role });
    } else {
      res.status(401).json({ message: "Incorrect email, password, or role" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
