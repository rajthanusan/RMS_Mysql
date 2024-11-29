import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../assets/style/ManageFoods.css';

export default function AdminManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '', 
  });
  const [editingRoomId, setEditingRoomId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Error fetching rooms');
      }
    };
    fetchRooms();
  }, []);

  const handleSubmitRoom = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingRoomId) {
        response = await axios.put(`/api/rooms/${editingRoomId}`, newRoom);
        setRooms(rooms.map(room => (room.id === editingRoomId ? response.data : room)));
        setEditingRoomId(null);
        toast.success('Room updated successfully');
      } else {
        response = await axios.post('/api/rooms', newRoom);
        setRooms([...rooms, response.data]);
        toast.success('Room added successfully');
      }
      setNewRoom({ name: '', type: '' });
    } catch (error) {
      console.error('Error saving room:', error);
      toast.error('Error saving room');
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      setRooms(rooms.filter(room => room.id !== id));
      toast.success('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Error deleting room');
    }
  };

  const handleEditRoom = (id) => {
    const room = rooms.find(room => room.id === id);
    setNewRoom({ name: room.name, type: room.type });
    setEditingRoomId(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="manage-foods">
    <div className="container">
      <div className="form manage-foods-form bg-eerie-black-3">
          <form className="form-left" onSubmit={handleSubmitRoom}>
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>Manage Rooms/Halls</h2>
            <p className="form-text text-center" style={{ color: 'var(--quick-silver)' }}>
              Add or Edit Rooms/Halls
            </p>
            <div className="input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Room/Hall Name"
                value={newRoom.name}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              />
              <select
                name="type"
                value={newRoom.type}
                onChange={handleInputChange}
                className="input-field input-field1"
                required
              >
                <option value="">Select Type</option>
                <option value="Room">Room</option>
                <option value="Hall">Hall</option>
              </select>
            </div>
            <button type="submit" className="btn btn-secondary">
              <span className="text text-1">
                {editingRoomId ? 'Update Room/Hall' : 'Add Room/Hall'}
              </span>
              <span className="text text-2" aria-hidden="true">
                {editingRoomId ? 'Update Room/Hall' : 'Add Room/Hall'}
              </span>
            </button>
          </form>
        </div>
        <br />
       
        <div className="food-table form">
  {rooms.length > 0 ? (
    <>
      <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
        Rooms/Halls Lists
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>
                <FaEdit
                  onClick={() => handleEditRoom(room.id)}
                  style={{
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: 'var(--yellow-crayola)',
                    marginRight: '2rem',
                  }}
                />
                <FaTrash
                  onClick={() => handleDeleteRoom(room.id)}
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
    </>
  ) : (
    <>
      <h2 className="headline-1 text-center" style={{ color: "var(--gold-crayola)" }}>
        Rooms/Halls Lists
      </h2>
      <p className="text-center" style={{ color: 'var(--quick-silver)', marginTop: '2rem' }}>
        No rooms or halls available. Please add some rooms/halls to the list.
      </p>
    </>
  )}
</div>
</div>

    </section>
  );
}
