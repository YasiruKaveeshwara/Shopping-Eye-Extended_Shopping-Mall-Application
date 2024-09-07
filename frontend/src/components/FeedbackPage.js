import React, { useEffect, useState } from 'react';
import '../components/FeedbackPage.css';
import SidebarIcon from '../components/sidebar/SidebarIcon'; // Sidebar component

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks when the component loads
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/feedback');
        if (!response.ok) {
          throw new Error("Feedback not found");
        }
        const data = await response.json();
        setFeedbacks(data); // Set all feedbacks
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback">

      <div className="flex">
        {/* Sidebar Component */}
        <SidebarIcon />

        {/* Main Content */}
        <div className="container mx-auto p-6 flex-1">
          <div className="mt-6">
            <h3>User Feedback:</h3>
            <ul>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    <p className="text-gray-700">{fb.comment}</p>
                    <p className="rating">Rating: {fb.rating}/5</p>
                    <p className="text-sm text-gray-500">- {fb.user || 'Anonymous'}</p>
                  </li>
                ))
              ) : (
                <p className="no-feedback">No feedback yet</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
