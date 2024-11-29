import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../assets/style/ManageFoods.css';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);

   
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
         
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          toast.error('Invalid data received!');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to fetch events!');
      }
    };

    fetchEvents();

     
    const intervalId = setInterval(fetchEvents, 5000);
    return () => clearInterval(intervalId);  
  }, []);

   
  const toggleEventStatus = async (id, currentStatus) => {
    try {
       
      const activeEventsCount = events.filter(event => event.status === 'Active').length;
      if (currentStatus === 'Inactive' && activeEventsCount >= 3) {
        toast.error('You can only have 3 active events at a time!');
        return;
      }

       
      const updatedEvents = events.map(event =>
        event._id === id ? { ...event, status: currentStatus === 'Active' ? 'Inactive' : 'Active' } : event
      );
      setEvents(updatedEvents);

       
      await axios.put(`/api/events/${id}/status`, {
        status: currentStatus === 'Active' ? 'Inactive' : 'Active',
      });

      toast.success(`Event status updated to ${currentStatus === 'Active' ? 'Inactive' : 'Active'}`);
    } catch (error) {
      console.error('Error updating event status:', error);
      toast.error('Failed to update event status!');
    }
  };

  return (
    <section className="manage-foods">
    <div className="container">
      <div className="form manage-subscribers-form bg-eerie-black-3">
        <div className="food-table">
            <h2 className="headline-1 text-center" style={{ color: 'var(--gold-crayola)' }}>
              Upcoming Events
            </h2>
            {events.length > 0 ? (
              <table className="table">
                <thead
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--smoky-black-2)',
                  }}
                >
                  <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Toggle Status</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--smoky-black-2)',
                  }}
                >
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.title}</td>
                      <td>{event.subtitle}</td>
                      <td>{event.location}</td>
                      <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                      <td>
                        <img
                          src={event.image ? `/uploads/${event.image}` : '/default-image.jpg'}
                          alt="Event"
                          width="50"
                        />
                      </td>
                      <td>{event.status}</td>
                      <td>
                        {event.status === 'Active' ? (
                          <FaToggleOn
                            onClick={() => toggleEventStatus(event._id, event.status)}
                            style={{
                              color: 'hsl(38, 61%, 73%)',
                              cursor: 'pointer',
                              fontSize: '3rem',
                            }}
                            aria-label="Deactivate"
                          />
                        ) : (
                          <FaToggleOff
                            onClick={() => toggleEventStatus(event._id, event.status)}
                            style={{
                              color: 'hsl(38, 61%, 73%)',
                              cursor: 'pointer',
                              fontSize: '3rem',
                            }}
                            aria-label="Activate"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center" style={{ color: 'var(--smoky-black-2)' }}>
                No events to display.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
