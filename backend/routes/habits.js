const router = require('express').Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

router.use(auth);

// GET /api/habits
router.get('/', async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) { next(err); }
});

// POST /api/habits
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Habit name required' });
    const habit = await Habit.create({ user: req.userId, name: name.trim(), log: {} });
    res.status(201).json(habit);
  } catch (err) { next(err); }
});

// PATCH /api/habits/:id/toggle  — flip a date in the log
router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const { date } = req.body; // expects 'YYYY-MM-DD'
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Valid date (YYYY-MM-DD) required' });
    }

    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    if (habit.log.get(date)) habit.log.delete(date);
    else habit.log.set(date, true);

    await habit.save();
    res.json(habit);
  } catch (err) { next(err); }
});

// DELETE /api/habits/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
