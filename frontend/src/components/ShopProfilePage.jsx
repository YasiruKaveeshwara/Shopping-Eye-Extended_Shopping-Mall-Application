import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header"; // Adjust the path based on your folder structure

const ShopProfilePage = () => {
  const { id } = useParams(); // Get the shop ID from the URL
  const [shop, setShop] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/shops/${id}`);
        if (!response.ok) {
          throw new Error("Shop not found");
        }
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3050/api/feedbacks/${id}`
        );
        if (!response.ok) {
          throw new Error("Feedback not found");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchShop();
    fetchFeedbacks();
  }, [id]);

  const handleRatingChange = (e) => setRating(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setUserName(""); // Clear the user name if anonymous
    }
  };
  const handleUserNameChange = (e) => setUserName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3050/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shopId: id,
          user: isAnonymous ? "Anonymous" : userName,
          comment: feedback,
          rating: parseFloat(rating)
        })
      });
      if (response.ok) {
        setSubmitted(true);
        // Optionally refetch feedback data or update UI
        const newFeedback = await response.json();
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
      } else {
        console.error("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header activePage="shops" /> */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{shop.shopName}</h1>
        <p className="text-gray-700">Location: {shop.location}</p>
        <p className="text-gray-700">Category: {shop.category}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Ratings & Feedback</h2>
          <div>
            <h3 className="text-xl font-semibold">Ratings:</h3>
            <p>
              {feedbacks.length > 0
                ? (
                    feedbacks.reduce((sum, fb) => sum + (fb.rating || 0), 0) /
                    feedbacks.length
                  ).toFixed(1)
                : "No ratings yet"}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Feedback:</h3>
            <ul>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    <p className="text-gray-700">{fb.comment}</p>
                    <p className="text-sm text-gray-500">- {fb.user}</p>
                  </li>
                ))
              ) : (
                <p>No feedback yet</p>
              )}
            </ul>
          </div>
        </div>

        {/* Rating and feedback form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rate this shop (1-5):
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={handleFeedbackChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={handleAnonymousChange}
              className="mr-2"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Submit as Anonymous
            </label>
          </div>
          {!isAnonymous && (
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name:
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={handleUserNameChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your name"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
          {submitted && (
            <p className="text-green-500 mt-4">Thank you for your feedback!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ShopProfilePage;
