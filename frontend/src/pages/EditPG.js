import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditPG = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rent: "",
    location: "",
    facilities: "",
  });

  useEffect(() => {

    const fetchPG = async () => {

      try {

        const res = await API.get(`/pg/${id}`);

        setFormData({
          name: res.data.name,
          rent: res.data.rent,
          location: res.data.location,
          facilities: res.data.facilities.join(", "),
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchPG();

  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/pg/update/${id}`,
        {
          ...formData,
          facilities: formData.facilities.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("PG Updated Successfully ✅");

      navigate("/");

    } catch (error) {
      console.log(error);

      alert("Failed to update PG ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          ✏ Edit PG
        </h1>

        <input
          type="text"
          name="name"
          placeholder="PG Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          name="facilities"
          placeholder="Facilities"
          value={formData.facilities}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Update PG
        </button>

      </form>

    </div>
  );
};

export default EditPG;