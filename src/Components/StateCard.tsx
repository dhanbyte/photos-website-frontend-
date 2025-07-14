// src/components/StateCard.tsx
import { Link } from "react-router-dom";

type Props = {
  state: { _id: string; name: string };
  eventId: string;
};

export default function StateCard({ state, eventId }: Props) {
  return (
    <Link to={`/events/${eventId}/states/${state._id}`}>
      <div className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
        <h3 className="text-lg">{state.name}</h3>
      </div>
    </Link>
  );
}
