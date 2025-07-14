import { useEffect, useState } from "react";
import API from "./api";
import EventCard from "../src/Components/EventCard";
import type { Event } from "./types";

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);

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
