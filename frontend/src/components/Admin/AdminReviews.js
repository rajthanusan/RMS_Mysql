import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import {toast } from "react-toastify";  

import "../assets/style/ManageFoods.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });
  const [editReviewId, setEditReviewId] = useState(null);

  
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Failed to fetch reviews.");
    }
  };

  
  const deleteReview = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review.");
    }
  };

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;
    try {
      if (editReviewId) {
        const response = await axios.put(`/api/reviews/${editReviewId}`, { name, review, rating });
        setReviews(reviews.map((r) => (r.id === editReviewId ? response.data.review : r)));
        toast.success("Review updated successfully!");
      } else {
        const response = await axios.post("/api/reviews", { name, review, rating });
        setReviews([response.data.review, ...reviews]);
        toast.success("Review added successfully!");
      }
      setFormData({ name: '', review: '', rating: 0 });
      setEditReviewId(null);  
    } catch (error) {
      console.error("Failed to add or update review:", error);
      toast.error("Failed to add or update review.");
    }
  };

  
  const handleEdit = (id) => {
    const review = reviews.find((review) => review.id === id);
    if (review) {
      setFormData({
        name: review.name,
        review: review.review,
        rating: review.rating,
      });
      setEditReviewId(id);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className="manage-foods">
    <div className="container">
      <div className="form manage-foods-form bg-eerie-black-3">
        <form className="form-left" onSubmit={handleSubmit}>
          <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
            Manage Reviews
          </h2>
          <p className="form-text text-center" style={{ color: "var(--quick-silver)" }}>
            Add or Edit Reviews
          </p>

          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              placeholder="Review Name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field input-field1"
            />
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              name="review"
              placeholder="Review"
              value={formData.review}
              onChange={handleInputChange}
              className="input-field input-field1"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="input-field input-field1"
              min="1"
              max="5"
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            {editReviewId ? 'Update Review' : 'Save Review'}
          </button>
          </form>
        </div>
<br />
<div className="food-table form">
  {reviews.length > 0 ? (
    <>
      <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
        Review List
      </h2>
      <table className="table">
        <thead style={{ backgroundColor: "var(--white)", color: "var(--smoky-black-2)" }}>
          <tr>
            <th>Name</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "var(--white)", color: "var(--smoky-black-2)" }}>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.name}</td>
              <td>"{review.review}"</td>
              <td>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</td>
              <td>
                <FaEdit
                  onClick={() => handleEdit(review.id)}
                  style={{ fontSize: "2rem", cursor: "pointer", color: "var(--yellow-crayola)" }}
                />
                <FaTrash
                  onClick={() => deleteReview(review.id)}
                  style={{ cursor: "pointer", color: "var(--danger)", marginLeft: "1.5rem" }}
                  aria-label="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>
      <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
        Reviews Lists
      </h2>
      <p className="text-center" style={{ color: "var(--quick-silver)", marginTop: "2rem" }}>
        There are no reviews at the moment. Please add some reviews.
      </p>
    </>
  )}
</div>
</div>

    
    </section>

  );
}
