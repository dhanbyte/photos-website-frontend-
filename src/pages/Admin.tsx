import { useEffect, useState } from "react";
import API from "../api";
import type { Event, State } from "../types";

export default function Admin() {
  const [tab, setTab] = useState("photo");
  const [events, setEvents] = useState<Event[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventMessage, setEventMessage] = useState("");
  const [eventError, setEventError] = useState("");

  const [stateName, setStateName] = useState("");
  const [stateMessage, setStateMessage] = useState("");
  const [stateError, setStateError] = useState("");

  const [photoImages, setPhotoImages] = useState<File[]>([]);
  const [photoMessage, setPhotoMessage] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error loading events:", err));
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    API.get(`/states?eventId=${selectedEvent}`)
      .then(res => setStates(res.data))
      .catch(err => console.error("Error loading states:", err));
  }, [selectedEvent]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await API.post("/upload", formData);
    return res.data.url;
  };

  const handleEventUpload = async () => {
    if (!eventImage || !eventName) {
      setEventError("Event name or image missing.");
      setEventMessage("");
      return;
    }
    try {
      const imageUrl = await uploadFile(eventImage);
      await API.post("/events", {
        name: eventName,
        coverImage: imageUrl,
        date: new Date().toISOString(),
      });
      setEventMessage("✅ Event uploaded successfully!");
      setEventError("");
      setEventName("");
      setEventImage(null);

      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error uploading event:", err);
      setEventError("❌ Failed to upload event.");
      setEventMessage("");
    }
  };

  const handleStateUpload = async () => {
    if (!stateName || !selectedEvent) {
      setStateError("Missing data.");
      setStateMessage("");
      return;
    }
    try {
      await API.post("/states", {
        eventId: selectedEvent,
        name: stateName,
      });
      setStateMessage("✅ State uploaded successfully!");
      setStateError("");
      setStateName("");

      const res = await API.get(`/states?eventId=${selectedEvent}`);
      setStates(res.data);
    } catch (err) {
      console.error("Error uploading state:", err);
      setStateError("❌ Failed to upload state.");
      setStateMessage("");
    }
  };

  const handlePhotoUpload = async () => {
    if (photoImages.length === 0 || !selectedEvent || !selectedState) {
      setPhotoError("Missing fields");
      setPhotoMessage("");
      return;
    }
    try {
      await Promise.all(
        photoImages.map(async (image) => {
          const imageUrl = await uploadFile(image);
          const date = new Date().toISOString().split("T")[0];
          return API.post("/photos", {
            eventId: selectedEvent,
            state: selectedState,
            url: imageUrl,
            date,
          });
        })
      );
      setPhotoMessage("✅ All photos uploaded successfully!");
      setPhotoError("");
      setPhotoImages([]);
    } catch (err) {
      console.error("Error uploading photos:", err);
      setPhotoError("❌ Failed to upload one or more photos.");
      setPhotoMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
      
      <div className="flex justify-around space-x-2">
        <button 
          onClick={() => setTab("photo")} 
          className={`px-4 py-2 rounded ${tab === "photo" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
        >
          Upload Photo
        </button>
        <button 
          onClick={() => setTab("event")} 
          className={`px-4 py-2 rounded ${tab === "event" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload Event
        </button>
        <button 
          onClick={() => setTab("state")} 
          className={`px-4 py-2 rounded ${tab === "state" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Upload State
        </button>
      </div>

      {tab === "event" && (
        <div className="space-y-3 border p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold">📅 Upload Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            className="w-full border rounded p-2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEventImage(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleEventUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Event
          </button>
          {eventMessage && <div className="text-green-600">{eventMessage}</div>}
          {eventError && <div className="text-red-600">{eventError}</div>}
        </div>
      )}

      {tab === "state" && (
        <div className="space-y-3 border p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold">📍 Upload State</h2>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="State Name"
            className="w-full border rounded p-2"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <button
            onClick={handleStateUpload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload State
          </button>
          {stateMessage && <div className="text-green-600">{stateMessage}</div>}
          {stateError && <div className="text-red-600">{stateError}</div>}
        </div>
      )}

      {tab === "photo" && (
        <div className="space-y-3 border p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold">🖼️ Upload Photo</h2>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select Event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setPhotoImages(Array.from(e.target.files || []))}
          />
          <button
            onClick={handlePhotoUpload}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Upload Photo(s)
          </button>
          {photoMessage && <div className="text-green-600">{photoMessage}</div>}
          {photoError && <div className="text-red-600">{photoError}</div>}
        </div>
      )}
    </div>
  );
} 