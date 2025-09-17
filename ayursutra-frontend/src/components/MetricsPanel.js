import React from 'react';

const stats = [
  { label: 'Years of Practice', value: 10 },
  { label: 'Therapy Types', value: 5 },
  { label: 'Happy Patients', value: 250 },
];

export default function MetricsPanel() {
  return (
    <div className="container py-4">
      <div className="row text-center">
        {stats.map((s) => (
          <div className="col-sm-4 mb-3" key={s.label}>
            <div className="p-3 shadow-sm rounded bg-white">
              <h2 className="display-6 text-success">{s.value}+</h2>
              <p className="mb-0">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
