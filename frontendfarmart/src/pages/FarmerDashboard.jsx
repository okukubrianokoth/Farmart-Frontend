// src/pages/FarmerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAnimals } from "../store/slices/animalsSlice";
import { animalService } from "../services/animalService";
import { toast } from "react-toastify";
import "./FarmerDashboard.css";
import Footer from "../components/common/footer";
import AnimalForm from "../components/animals/animalForm";

const FarmerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { animals, isLoading: animalsLoading } = useSelector(
    (state) => state.animals
  );

  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const [animalForm, setAnimalForm] = useState({
    name: "",
    animal_type: "cattle",
    breed: "",
    age: "",
    price: 0,
    weight: "",
    description: "",
    image_url: "",
    is_available: true,
  });

  // ✅ Redirect non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isAuthenticated && user?.user_type === "farmer") {
      dispatch(fetchAnimals());
    }
  }, [dispatch, user, isAuthenticated, navigate]);

  // ✅ Add or update animal
  const handleAnimalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAnimal) {
        await animalService.updateAnimal(editingAnimal.id, animalForm);
        toast.success("Animal updated successfully!");
      } else {
        await animalService.createAnimal(animalForm);
        toast.success("Animal added successfully!");
      }
      setShowAnimalForm(false);
      setEditingAnimal(null);
      dispatch(fetchAnimals());
    } catch (error) {
      toast.error(
        `Failed to ${
          editingAnimal ? "update" : "add"
        } animal: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEditAnimal = (animal) => {
    setEditingAnimal(animal);
    setAnimalForm({
      name: animal.name,
      animal_type: animal.animal_type,
      breed: animal.breed,
      age: animal.age,
      price: animal.price || 0,
      weight: animal.weight || "",
      description: animal.description || "",
      image_url: animal.image_url || "",
      is_available: animal.is_available,
    });
    setShowAnimalForm(true);
  };

  const handleDeleteAnimal = async (animalId) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;
    try {
      await animalService.deleteAnimal(animalId);
      toast.success("Animal deleted successfully!");
      dispatch(fetchAnimals());
    } catch {
      toast.error("Failed to delete animal");
    }
  };

  const toggleAvailability = async (animal) => {
    try {
      await animalService.updateAnimal(animal.id, {
        is_available: !animal.is_available,
      });
      toast.success(
        `Animal marked as ${!animal.is_available ? "available" : "sold"}!`
      );
      dispatch(fetchAnimals());
    } catch {
      toast.error("Failed to update animal availability");
    }
  };

  if (!isAuthenticated || !user) {
    return <div className="container">Loading...</div>;
  }

  if (user.user_type !== "farmer") {
    return (
      <div className="container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>This page is only available for farmers.</p>
        </div>
      </div>
    );
  }

  const myAnimals = (animals || []).filter((a) => a.farmer?.id === user.id);

  return (
    <div className="farmer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowAnimalForm(true)}
          >
            Add New Animal
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Animals</h3>
            <p>{myAnimals.length}</p>
          </div>
          <div className="stat-card">
            <h3>Available Animals</h3>
            <p>{myAnimals.filter((a) => a.is_available).length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <p>
              $
              {myAnimals
                .reduce((total, animal) => total + Number(animal.price || 0), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        {showAnimalForm && (
          <AnimalForm
            animalForm={animalForm}
            setAnimalForm={setAnimalForm}
            editingAnimal={editingAnimal}
            onSubmit={handleAnimalSubmit}
            onCancel={() => setShowAnimalForm(false)}
          />
        )}

        <div className="my-animals">
          <h2>My Animals</h2>
          {animalsLoading ? (
            <div className="loading">Loading animals...</div>
          ) : myAnimals.length === 0 ? (
            <div className="no-animals">
              <p>You haven't added any animals yet.</p>
              <p>Click "Add New Animal" to get started!</p>
            </div>
          ) : (
            <div className="animals-grid">
              {myAnimals.map((animal) => (
                <div key={animal.id} className="animal-card">
                  <div className="animal-image">
                    <img
                      src={
                        animal.image_url ||
                        "https://via.placeholder.com/300x200?text=Animal+Image"
                      }
                      alt={animal.name}
                    />
                    {!animal.is_available && (
                      <div className="sold-badge">Sold</div>
                    )}
                  </div>

                  <div className="animal-info">
                    <h3>{animal.name}</h3>
                    <div className="animal-details">
                      <span>{animal.animal_type}</span> |{" "}
                      <span>{animal.breed}</span>
                    </div>
                    <p className="animal-price">${animal.price}</p>
                    <p className="animal-description">{animal.description}</p>

                    <div className="animal-actions">
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => handleEditAnimal(animal)}
                      >
                        Edit
                      </button>
                      <button
                        className={`btn btn-small ${
                          animal.is_available ? "btn-warning" : "btn-success"
                        }`}
                        onClick={() => toggleAvailability(animal)}
                      >
                        {animal.is_available ? "Mark Sold" : "Mark Available"}
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDeleteAnimal(animal.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FarmerDashboard;