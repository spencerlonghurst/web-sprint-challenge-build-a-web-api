const Project = require('./projects-model');

async function validateProjectsId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      res.status(404).json({ message: "project not found" })
    } else {
      req.project = project
      next()
    }
  } catch {
    res.status(500).json({
    message: 'Error retrieving the project',
  });
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description || completed === undefined) {
    res.status(400).json({ message: "missing required field" })
  } else {
    next()
  }
}

module.exports = {
  validateProject,
  validateProjectsId,
}