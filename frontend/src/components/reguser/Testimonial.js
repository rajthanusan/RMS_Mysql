import React, { useEffect, useState } from 'react';

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

   
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();

       
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        console.error('Expected an array but got:', data);
        setTestimonials([]);   
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 5000);   

    return () => clearInterval(interval);   
  }, []);

  return (
    <section className="section reviews__container bg-img3 full__screen " id="reviews">
      <p className="section-subtitle label-2">What Our Customers Say</p>
      <h2 className="headline-1 section-title">Reviews and Testimonials</h2>

      {/* Conditional rendering: If there are no reviews, display the message */}
      {testimonials.length === 0 ? (
        <h2 className="headline-1 section-title text-center">Currently, there are no reviews available.</h2>
      ) : (
        <div className="reviews__grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="review__card">
              <p className="review__text">"{testimonial.review}"</p>
              <p className="review__name">{testimonial.name}</p>
              <div className="review__rating">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Testimonial;
