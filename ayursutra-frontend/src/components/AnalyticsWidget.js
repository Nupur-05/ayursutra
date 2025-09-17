import React from "react";

export default function AnalyticsWidget({ appointments }) {
  const total = appointments.length;
  const completed = appointments.filter(a => a.status === "Completed").length;
  const pending = appointments.filter(a => a.status !== "Completed").length;

  return (
    <div className="row text-center mb-4">
      <div className="col-md-4 mb-2">
        <div className="p-3 bg-white shadow-sm rounded">
          <h4 className="text-success">{total}</h4>
          <p className="mb-0">Total Appointments</p>
        </div>
      </div>
      <div className="col-md-4 mb-2">
        <div className="p-3 bg-white shadow-sm rounded">
          <h4 className="text-primary">{completed}</h4>
          <p className="mb-0">Completed</p>
        </div>
      </div>
      <div className="col-md-4 mb-2">
        <div className="p-3 bg-white shadow-sm rounded">
          <h4 className="text-warning">{pending}</h4>
          <p className="mb-0">Pending</p>
        </div>
      </div>
    </div>
  );
}
