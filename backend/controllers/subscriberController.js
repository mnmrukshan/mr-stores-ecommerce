import { Subscriber } from '../models/Subscriber.js';

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if wait exists
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new Subscriber({ email });
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all subscribers (Admin)
// @route   GET /api/subscribers
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ joinedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a subscriber
// @route   DELETE /api/subscribers/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber) {
      await subscriber.deleteOne();
      res.json({ message: 'Subscriber removed' });
    } else {
      res.status(404).json({ message: 'Subscriber not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
