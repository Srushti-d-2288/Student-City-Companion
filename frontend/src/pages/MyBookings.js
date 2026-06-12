import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/user/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Bookings Response:", res.data);

        setPgs(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  console.log("PGs State:", pgs);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📅 My Bookings
      </h1>

      {pgs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No bookings found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <Link
              key={pg._id}
              to={`/pg/${pg._id}`}
            >
              <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

                {pg.image ? (
                  <img
                    src={pg.image}
                    alt={pg.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                    No Image
                  </div>
                )}

                <h2 className="text-xl font-semibold mt-3">
                  {pg.name}
                </h2>

                <p className="mt-2">
                  📍 {pg.location}
                </p>

                <p className="mt-1">
                  💰 ₹{pg.rent}
                </p>

                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                  View Details
                </button>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;