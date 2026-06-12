import { useEffect, useState } from "react";
import API from "../services/api";

const MyPGs = () => {

  const [pgs, setPgs] = useState([]);

  useEffect(() => {

    const fetchMyPGs = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get(
          "/pg/mypgs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPgs(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPGs();

  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      <h1 className="text-3xl font-bold text-center mb-8">
        My PG Listings
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {pgs.map((pg) => (

          <div
            key={pg._id}
            className="bg-white p-5 rounded-xl shadow-md"
          >

            <img
              src={pg.image}
              alt={pg.name}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2 className="text-xl font-semibold mt-3">
              {pg.name}
            </h2>

            <p>📍 {pg.location}</p>

            <p>💰 ₹{pg.rent}</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyPGs;