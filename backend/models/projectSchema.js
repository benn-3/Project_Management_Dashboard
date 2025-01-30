const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  teamMembers: String,
  roles: String,
  progress: { type: Number, default: 0 },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
