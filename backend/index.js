const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("./models/projectSchema");
const User = require("./models/userSchema");

const app = express();
dotenv.config();
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'mysecretkey';
app.use(cors());
app.use(express.json());

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

// Create Project endpoint
app.post("/createProject", authenticateToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project saved successfully!" });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(400).json({ message: "Error saving project", error });
  }
});

// Get All Projects endpoint
app.get("/projects", authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find().populate('teamMembers');
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ message: "Error retrieving projects", error });
  }
});

// User Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { username, firstname, lastname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || 'user'
    });
    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ message: "Error during signup", error });
  }
});

// User Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email, password, or role" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful!", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
});

// Get Project by ID endpoint
app.get("/projects/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('teamMembers');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).json({ message: "Error retrieving project", error });
  }
});

// Update Project endpoint
app.put("/projects/:id", authenticateToken, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ message: "Error updating project", error });
  }
});

// Delete Project endpoint
app.delete("/projects/:id", authenticateToken, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: "Error deleting project", error });
  }
});

// Assign User to Project endpoint
app.post("/projects/:id/assign", authenticateToken, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.teamMembers.includes(userId)) {
      project.teamMembers.push(userId);
      project.roles.push(role);
      await project.save();
    }
    res.status(200).json({ message: 'User assigned' });
  } catch (error) {
    console.error('Error assigning user:', error);
    res.status(500).json({ message: "Error assigning user", error });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
