import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Favorites = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/user/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPgs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-2xl">
        Loading...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        ❤️ My Favorite PGs
      </h1>

      {pgs.length === 0 ? (
        <p className="text-center text-gray-500">
          No favorite PGs yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <Link
              key={pg._id}
              to={`/pg/${pg._id}`}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

                {pg.image && (
                  <img
                    src={pg.image}
                    alt={pg.name}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    {pg.name}
                  </h2>

                  <p className="text-gray-600">
                    📍 {pg.location}
                  </p>

                  <p className="text-gray-800 font-medium mt-2">
                    💰 ₹{pg.rent} / month
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {pg.facilities?.join(", ")}
                  </p>

                  <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;