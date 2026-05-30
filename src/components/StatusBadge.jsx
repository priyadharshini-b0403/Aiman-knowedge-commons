const StatusBadge = ({ status }) => {
  const colors = {
    Submitted: "bg-blue-500",
    Verified: "bg-green-500",
    Rejected: "bg-red-500",
    "Needs Review": "bg-yellow-500",
    "Needs More Evidence": "bg-orange-500"
  };

  return (
    <span
      className={`px-3 py-1 text-white rounded-full text-sm ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;