const express = require('express');

const { validateProjectsId, validateProject } = require('./projects-middleware');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.get()
    .then(actions => {
      res.status(200).json(actions);
      console.log('sucessfully GOT');
    })
    .catch(error => {
      next({ error });
    })
})

router.get('/:id', validateProjectsId, (req, res, next) => {
  res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectsId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
  .then(() => {
    return Projects.get(req.params.id)
  })
  .then(project => {
    res.json(project)
  })
  .catch(next)
})

router.delete('/:id', validateProjectsId,  async (req, res, next) => {
  try {
    await Projects.remove(req.params.id)
    res.json(req.body)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/actions', validateProjectsId, async (req, res, next) => {
  try {
    const project = await Projects.getProjectActions(req.params.id)
    res.json(project)
  } catch (err) {
    next(err)
  }
})




module.exports = router