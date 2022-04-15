const express = require('express');

const { validateActionsId, validateAction } = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => { //GET
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
      console.log('sucessfully GOT');
    })
    .catch(error => {
      next({ error });
    })
})

router.get('/:id', validateActionsId, (req, res, next) => { //GET 
  res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => { //POST
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => { //PUT

})

router.delete('/:id', (req, res, next) => { //DELETE

})





module.exports = router
