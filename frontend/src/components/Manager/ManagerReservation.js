import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "../assets/style/ManageFoods.css";

export default function ManagerReservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/bookings")
        .then((response) => {
          if (response.data.success) {
            setReservations(response.data.data);
          }
        })
        .catch((error) => console.error("Error fetching reservations:", error));
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/bookings/${id}`)
      .then((response) => {
        if (response.data.success) {
          setReservations((prev) =>
            prev.filter((reservation) => reservation.id !== id)
          );
          toast.success("Reservation deleted successfully!");
        }
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
        toast.error("Error deleting reservation!");
      });
  };

  return (
    <section className="manage-foods">
      <div className="container">
        <div className="form manage-foods-form bg-eerie-black-3">
          <div className="reservation-table">
            <h2
              className="headline-1 text-center"
              style={{ color: "var(--gold-crayola)" }}
            >
              Reservation List
            </h2>
            {reservations.length > 0 ? (
              <table className="table">
                <thead
                  style={{
                    backgroundColor: "var(--white)",
                    color: "var(--smoky-black-2)",
                  }}
                >
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Persons</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    backgroundColor: "var(--white)",
                    color: "var(--smoky-black-2)",
                  }}
                >
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.name}</td>
                      <td>{reservation.phone}</td>
                      <td>{reservation.person}</td>
                      <td>{reservation.reservationDate}</td>
                      <td>{reservation.time}</td>
                      <td>{reservation.message}</td>
                      <td>
                        <FaTrash
                          onClick={() => handleDelete(reservation.id)}
                          style={{ cursor: "pointer" }}
                          aria-label="Delete"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p
                className="text-center"
                style={{ color: "var(--quick-silver)" }}
              >
                No records found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
