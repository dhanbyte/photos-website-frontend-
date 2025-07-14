// src/components/EventCard.tsx
import { Link } from "react-router-dom";
import type { Event } from "../types";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Link to={`/events/${event._id}`}>
      <div className="p-4 shadow rounded-xl hover:shadow-md bg-white">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <p className="text-gray-500">{new Date(event.date).toDateString()}</p>
      </div>
    </Link>
  );
}
