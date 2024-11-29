const Review = require('../models/reviewModel');    

  
exports.addReview = async (req, res) => {
  const { name, review, rating } = req.body;

  try {
      
    const newReview = await Review.create({
      name,
      review,
      rating,
    });

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err });
  }
};

  
exports.getAllReviews = async (req, res) => {
  try {
      
    const reviews = await Review.findAll();
    res.status(200).json(reviews);    
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;

  try {
    const [updatedRows, updatedReview] = await Review.update(
      { name, review, rating },
      { where: { id }, returning: true }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update review', error: err.message });
  }
};
  
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
      
    const deletedReview = await Review.destroy({
      where: { id }
    });

      
    if (deletedReview === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err });
  }
};
