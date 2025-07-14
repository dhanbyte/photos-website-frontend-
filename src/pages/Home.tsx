// src/pages/Home.tsx
import { useEffect, useState } from "react";
import API from "../api";
import EventCard from "../Components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
