import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const PGDetails = () => {
  const { id } = useParams();

  const [pg, setPg] = useState(null);

  const [reviewData, setReviewData] = useState({
    user: "",
    comment: "",
    rating: "",
  });

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const res = await API.get(`/pg/${id}`);
        setPg(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPG();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/pg/review/${id}`, reviewData);

      alert("Review added successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/user/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("PG saved ❤️");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const handleBooking = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/pg/book/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking Requested Successfully ✅");

  } catch (error) {
    console.log(error);

    alert("Booking Failed ❌");
  }
};

  if (!pg) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  const averageRating =
    pg.reviews && pg.reviews.length > 0
      ? (
          pg.reviews.reduce(
            (sum, review) => sum + Number(review.rating),
            0
          ) / pg.reviews.length
        ).toFixed(1)
      : "No Ratings";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        
        {/* Image */}
        <img
          src={pg.image}
          alt={pg.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        {/* Save Button */}
        <button
          onClick={handleFavorite}
          className="bg-pink-500 text-white px-5 py-2 rounded-lg mb-6"
        >
          ❤️ Save PG
        </button>

        <button
       onClick={handleBooking}
       className="bg-green-500 text-white px-5 py-2 rounded-lg ml-3">
      📅 Book Now
       </button>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
          🏠 {pg.name}
        </h1>

        {/* Rating */}
        <p className="text-yellow-500 font-bold text-lg mb-4 text-center">
          ⭐ {averageRating}
        </p>

        {/* Location */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <p className="text-lg font-semibold">
            📍 Location
          </p>

          <p className="text-gray-700">
            {pg.location}
          </p>
        </div>

        {/* Rent */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <p className="text-lg font-semibold">
            💰 Monthly Rent
          </p>

          <p className="text-gray-700">
            ₹{pg.rent}
          </p>
        </div>

        {/* Facilities */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <p className="text-lg font-semibold mb-2">
            ✨ Facilities
          </p>

          <div className="flex flex-wrap gap-2">
            {pg.facilities?.map((facility, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Owner */}
        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-3">
            📞 Contact Owner
          </h2>

          <p>
            <strong>Name:</strong> {pg.ownerName}
          </p>

          <p>
            <strong>Phone:</strong> {pg.ownerPhone}
          </p>

          <p>
            <strong>Email:</strong> {pg.ownerEmail}
          </p>
        </div>

        {/* Add Review */}
        <form
          onSubmit={handleReviewSubmit}
          className="mt-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            ✍️ Add Review
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={reviewData.user}
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                user: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg mb-4"
          />

          <textarea
            placeholder="Write review"
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                comment: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                rating: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg mb-4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            ⭐ Reviews
          </h2>

          {pg.reviews?.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            pg.reviews?.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg mb-4"
              >
                <h3 className="font-semibold">
                  {review.user}
                </h3>

                <p>
                  ⭐ {review.rating}/5
                </p>

                <p className="mt-2">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default PGDetails;