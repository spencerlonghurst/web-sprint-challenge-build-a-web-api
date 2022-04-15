const express = require('express');

const { validateActionsId, validateAction } = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
      console.log('sucessfully GOT');
    })
    .catch(error => {
      next({ error });
    })
})

router.get('/:id', validateActionsId, (req, res, next) => {
  res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionsId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
  .then(action => {
    res.json(action)
  })
  .catch(next)
})

router.delete('/:id', validateActionsId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id)
    res.json(req.body)
  } catch (err) {
    next(err)
  }
})





module.exports = router
