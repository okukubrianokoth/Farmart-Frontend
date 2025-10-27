import React from "react";

function AnimalCard({ animal }) {
  return (
    <div className="shadow-lg p-4 rounded-lg bg-white">
      <img src={animal.image_url} alt={animal.name} className="rounded-lg w-full h-48 object-cover" />
      <h3 className="font-bold text-lg mt-2">{animal.name}</h3>
      <p>{animal.breed}</p>
      <p className="text-green-600 font-semibold">Ksh {animal.price}</p>
      <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded-lg hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}

export default AnimalCard;
