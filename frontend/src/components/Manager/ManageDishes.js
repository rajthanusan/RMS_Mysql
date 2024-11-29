import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../assets/style/ManageFoods.css';

export default function AdminManageDishes() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [editingDishId, setEditingDishId] = useState(null);

  // Fetch dishes from the server
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('/api/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
        toast.error('Error fetching dishes');
      }
    };
    fetchDishes();
  }, []);

  // Handle form submission for adding or editing a dish
  const handleSubmitDish = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newDish.title);
    formData.append('description', newDish.description);

    if (newDish.image) {
      formData.append('image', newDish.image);
    }

    try {
      let response;
      if (editingDishId) {
        // Update an existing dish
        response = await axios.put(`/api/dishes/${editingDishId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setDishes(dishes.map((dish) => (dish.id === editingDishId ? response.data : dish)));
        toast.success('Dish updated successfully');
      } else {
        // Add a new dish
        response = await axios.post('/api/dishes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setDishes([...dishes, response.data]);
        toast.success('Dish added successfully');
      }

      setNewDish({ title: '', description: '', image: null });
      setEditingDishId(null);
    } catch (error) {
      console.error('Error saving dish:', error);
      toast.error('Error saving dish');
    }
  };

  // Handle deleting a dish
  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`/api/dishes/${id}`);
      setDishes(dishes.filter((dish) => dish.id !== id));
      toast.success('Dish deleted successfully');
    } catch (error) {
      console.error('Error deleting dish:', error);
      toast.error('Error deleting dish');
    }
  };

  // Handle editing a dish
  const handleEditDish = (id) => {
    const dish = dishes.find((dish) => dish.id === id);
    setNewDish({ title: dish.title, description: dish.description, image: null });
    setEditingDishId(id);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setNewDish((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  // Check if the dish limit is reached
  const isDishLimitReached = dishes.length >= 3;

  return (
    <section className="manage-foods">
      <div className="container">
        {/* Add or Edit Dish Form */}
        <div className="form manage-dishes-form bg-eerie-black-3">
          <form className="form-left" onSubmit={handleSubmitDish}>
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
              Manage Special Dishes
            </h2>
            <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
              {isDishLimitReached
                ? 'You can only add up to 3 dishes in the menu'
                : 'Add or Edit Up to 3 Dishes in the Menu'}
            </p>

            <div className="input-wrapper">
              <input
                type="text"
                name="title"
                placeholder="Dish Name"
                value={newDish.title}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              />
              <textarea
                name="description"
                placeholder="Dish Description"
                value={newDish.description}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="input-field input-field1"
                required={!editingDishId}
                disabled={isDishLimitReached && !editingDishId}
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary"
              disabled={isDishLimitReached && !editingDishId}
            >
              <span className="text text-1">{editingDishId ? 'Update Dish' : 'Add Dish'}</span>
              <span className="text text-2" aria-hidden="true">
                {editingDishId ? 'Update Dish' : 'Add Dish'}
              </span>
            </button>
          </form>
        </div>

        <br />

        {/* Dishes List */}
        <div className="dishes-list form">
          <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
            Special Dishes
          </h2>

          {dishes.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish.id}>
                    <td>{dish.title}</td>
                    <td>{dish.description}</td>
                    <td>
                      <img src={dish.image} alt={dish.title} width="50" />
                    </td>
                    <td>
                      <FaEdit
                        onClick={() => handleEditDish(dish.id)}
                        style={{
                          fontSize: '2rem',
                          cursor: 'pointer',
                          color: 'var(--yellow-crayola)',
                          marginRight: '2rem',
                        }}
                      />
                      <FaTrash
                        onClick={() => handleDeleteDish(dish.id)}
                        style={{
                          fontSize: '2rem',
                          cursor: 'pointer',
                          color: 'var(--crimson)',
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center" style={{ color: 'var(--smoky-black-2)' }}>
              No dishes available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
