import React from 'react';

const therapies = [
  { key: 'Abhyanga', title: 'Abhyanga', desc: 'Full-body oil massage to balance doshas.' },
  { key: 'Virechana', title: 'Virechana', desc: 'Therapeutic purgation to cleanse Pitta.’' },
  { key: 'Vamana', title: 'Vamana', desc: 'Therapeutic emesis to balance Kapha.' },
];

export default function TherapyCards() {
  return (
    <div className="container my-4">
      <h3 className="mb-3">Our Therapies</h3>
      <div className="row">
        {therapies.map(t => (
          <div className="col-md-4 mb-3" key={t.key}>
            <div className="card h-100 shadow-sm">
              <img
                src={`https://source.unsplash.com/600x400/?ayurveda,spa,${t.key}`}
                alt={t.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{t.title}</h5>
                <p className="card-text">{t.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
