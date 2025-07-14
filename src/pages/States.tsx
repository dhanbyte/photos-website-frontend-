// src/pages/States.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import StateCard from "../Components/StateCard";
import type { State } from "../types";

export default function States() {
  const { eventId } = useParams();
  const [states, setStates] = useState<State[]>([]);

useEffect(() => {
  API.get(`/events/${eventId}/states`)
    .then(res => setStates(res.data))
    .catch(err => console.error("Error loading states", err));
}, [eventId]);
  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      {states.map((state) => (
        <StateCard key={state._id} state={state} eventId={eventId!} />
      ))}
    </div>
  );
}
