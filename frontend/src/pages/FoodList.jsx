import { useEffect, useState } from "react";
import API from "../services/api";
import FoodCard from "../components/FoodCard";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get("/foods");
        setFoods(res.data);
      } catch (err) {
        setError("Failed to load food items");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#FAF6E9] py-8 px-4">
  <h2 className="text-3xl font-bold text-center mb-8">
    Food Items
  </h2>

  <div className="">
    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
  {foods.map((food) => (
    <FoodCard key={food._id} food={food} />
  ))}
</div>
  </div>
</div>
  );
}

export default FoodList;