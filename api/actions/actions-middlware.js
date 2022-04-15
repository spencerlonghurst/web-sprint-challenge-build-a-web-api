const Action = require('./actions-model');



async function validateActionsId(req, res, next) {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({ message: "action not found" })
    } else {
      req.action = action
      next()
    }
  } catch {
    res.status(500).json({
    message: 'Error retrieving the user',
  });
  }
}

function validateAction(req, res, next) {
  const { description, notes, project_id, completed } = req.body;

  if (!description || !notes || !project_id === req.params.id || completed === undefined) {
    res.status(400).json({ message: "missing required description and note field" })
  } else {
    next()
  }
}





module.exports = {
  validateAction,
  validateActionsId,
}
