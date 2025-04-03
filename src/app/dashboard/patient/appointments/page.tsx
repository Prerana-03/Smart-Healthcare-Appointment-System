"use client";

import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availableSlots: string[];
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. John Smith",
    specialization: "Cardiologist",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    specialization: "Dermatologist",
    availableSlots: ["09:30", "10:30", "11:30", "14:30", "15:30"],
  },
];

export default function AppointmentBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement appointment booking
    console.log({ selectedDoctor, selectedDate, selectedTime });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Doctor Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Select Doctor</h2>
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedDoctor?.id === doctor.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <h3 className="font-medium">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Select Date</h2>
          <input
            type="date"
            className="input-field"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Time Selection */}
        {selectedDoctor && (
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Select Time</h2>
            <div className="grid grid-cols-3 gap-3">
              {selectedDoctor.availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`p-2 text-center rounded-md ${
                    selectedTime === slot
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!selectedDoctor || !selectedDate || !selectedTime}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
