import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals } from "../features/animals/animalsSlice";
import AnimalCard from "../components/AnimalCard";

function HomePage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.animals);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default HomePage;
