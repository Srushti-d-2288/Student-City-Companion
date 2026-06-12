
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const PGList = () => {
  // State variables
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & filter states
  const [search, setSearch] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // Fetch PG data
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await API.get("/pg/all");
        setPgs(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load PGs");
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  // Filter logic
 const filteredPGs = pgs.filter((pg) => {
  const searchText = search.toLowerCase().trim();

  return (
    (
      pg.location?.toLowerCase().includes(searchText) ||
      pg.name?.toLowerCase().includes(searchText)
    ) &&
    (maxRent === "" || pg.rent <= Number(maxRent))
  );
});
  // Loading UI
  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  // Error UI
  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this PG?");

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/pg/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("PG deleted successfully");

    // refresh UI
    window.location.reload();

  } catch (error) {
    console.log(error);
    alert("Failed to delete PG");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        🏠 Student PG Listings
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
  type="text"
  placeholder="Search by PG name or location"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="p-2 border rounded-lg w-full md:w-1/3"
/>

        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />
      </div>

      {/* No Data */}
      {filteredPGs.length === 0 ? (
        <p className="text-center text-gray-500">
          No PGs found
        </p>
      ) : (
        // PG Cards
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPGs.map((pg) => (
            <div
              key={pg._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <img src={pg.image} alt={pg.name} className="w-full h-52 object-cover rounded-lg mb-4"/>

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

             <Link to={`/pg/${pg._id}`}>
             <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
             View Details
              </button>
              </Link>

              <Link to={`/edit/${pg._id}`}>
             <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
            Edit PG
           </button>
          </Link>

          <button
          onClick={() => handleDelete(pg._id)}
          className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
           Delete PG
          </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PGList
