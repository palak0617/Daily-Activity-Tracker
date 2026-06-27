const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.use(auth); // all task routes require auth

// GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
});

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Task text required' });
    const task = await Task.create({ user: req.userId, text: text.trim() });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

// PATCH /api/tasks/:id  — toggle done or edit text
router.patch('/:id', async (req, res, next) => {
  try {
    const updates = {};
    if (typeof req.body.done === 'boolean') updates.done = req.body.done;
    if (typeof req.body.text === 'string') updates.text = req.body.text.trim();

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
