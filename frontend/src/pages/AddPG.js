import { useState } from "react";
import API from "../services/api";

const AddPG = () => {
  const [formData, setFormData] = useState({
    name: "",
    rent: "",
    location: "",
    facilities: "",
    image: null,
    ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("rent", formData.rent);
    data.append("location", formData.location);
    data.append("facilities", formData.facilities);
    data.append("image", formData.image);

      //await API.post("/pg/add", newPG);
      const token = localStorage.getItem("token");

console.log(token);

// await API.post("/pg/add", newPG, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
await API.post("/pg/add", data, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});


      alert("PG Added Successfully ✅");

      setFormData({
        name: "",
        rent: "",
        location: "",
        facilities: "",
        image: null,
        ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to add PG ❌");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          ➕ Add New PG
        </h1>

        <input
          type="text"
          name="name"
          placeholder="PG Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="facilities"
          placeholder="Facilities (comma separated)"
          value={formData.facilities}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
  type="text"
  name="ownerName"
  placeholder="Owner Name"
  value={formData.ownerName}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg mb-4"
/>

<input
  type="text"
  name="ownerPhone"
  placeholder="Owner Phone"
  value={formData.ownerPhone}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg mb-4"
/>

<input
  type="email"
  name="ownerEmail"
  placeholder="Owner Email"
  value={formData.ownerEmail}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg mb-4"
/>

        <input
          type="file"
          name="image"
          onChange={(e) =>
          setFormData({
          ...formData,
          image: e.target.files[0],
          })
         }
        className="w-full p-3 border rounded-lg mb-4"
         />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add PG
        </button>
      </form>
    </div>
  );
};

export default AddPG;