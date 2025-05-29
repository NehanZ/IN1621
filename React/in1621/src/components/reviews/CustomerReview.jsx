'use client';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function CustomerReview() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah J.',
      rating: 5,
      date: '2025-06-10',
      comment: 'The best cappuccino I\'ve ever had! The atmosphere is cozy and the staff is incredibly friendly.',
    },
    {
      id: 2,
      name: 'Michael T.',
      rating: 4,
      date: '2025-05-28',
      comment: 'Great coffee and delicious pastries. Will definitely come back when I\'m in Colombo again.',
    },
    {
      id: 3,
      name: 'Priya K.',
      rating: 5,
      date: '2025-04-15',
      comment: 'Authentic coffee experience with locally sourced beans. Love supporting local businesses like Ecafe!',
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split('T')[0],
      photo: '/images/reviewers/default.jpg'
    };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  return (
    <div className="flex flex-col bg-[#E5E5CB] py-12 px-6 items-center justify-center">
      {/* Reviews List */}
      <h2 className="text-3xl font-bold text-[#8a5a44] mb-8 text-center">Customer Reviews</h2>
      <div className="flex flex-row space-x-4 overflow-x-auto pb-4 mb-12">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#E5E5CB] rounded-lg shadow-md p-6 min-w-[320px]">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#8a5a44]">{review.name}</h4>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= review.rating ? 'text-[#c28f5a] fill-[#c28f5a]' : 'text-[#D5CEA3]'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="mt-3 text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form with Image Side-by-Side */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        <div className="flex flex-col md:flex-row bg-[#E5E5CB] rounded-lg shadow-md p-8 gap-8 w-full mb-20">
          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold text-[#8a5a44] mb-4">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#8a5a44] mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full p-3 border border-[#8a5a44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a5a44]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8a5a44] mb-1">Your Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={star <= newReview.rating ? 'text-[#8a5a44] fill-[#c28f5a]' : 'text-[#8a5a44]'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-[#8a5a44] mb-1">Your Review</label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-[#8a5a44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a5a44]"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#8a5a44] text-white py-3 px-6 rounded-lg hover:bg-[#6d4737] transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <img
              src="/images/coffee-cup.jpg"
              alt="Coffee Cup"
              className="rounded-lg w-full h-auto object-cover max-h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
