import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const ClaimCard = ({ claim }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold">{claim.title}</h3>

      <p className="text-gray-600 mt-2">{claim.category}</p>

      <div className="flex justify-between mt-4">
        <StatusBadge status={claim.status} />

        <span className="font-bold">
          Score: {claim.score}
        </span>
      </div>

      <Link
        to={`/claim/${claim.id}`}
        className="inline-block mt-4 bg-slate-900 text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default ClaimCard;