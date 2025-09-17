import React, { useState } from 'react';

const instructionsData = {
  English: {
    Abhyanga: {
      pre: "Arrive 15 minutes early. Avoid heavy meals 2 hours before the therapy.",
      post: "Drink warm water. Rest for 2 hours after therapy."
    },
    Virechana: {
      pre: "Follow light diet before session.",
      post: "Avoid spicy food for 24 hours post therapy."
    },
    Vamana: {
      pre: "Follow the pre-procedure protocol provided by the clinic.",
      post: "Rest and follow diet as advised by therapist."
    }
  },
  Hindi: {
    Abhyanga: {
      pre: "15 मिनट पहले आएं। उपचार से 2 घंटे पहले भारी भोजन न करें।",
      post: "गर्म पानी पिएं। उपचार के बाद 2 घंटे आराम करें।"
    },
    Virechana: {
      pre: "सत्र से पहले हल्का आहार लें।",
      post: "उपचार के 24 घंटे तक मसालेदार भोजन से बचें।"
    },
    Vamana: {
      pre: "क्लिनिक द्वारा दी गई तैयारी का पालन करें।",
      post: "आराम करें और चिकित्सक के निर्देशों का पालन करें।"
    }
  }
};

export default function Instructions() {
  const [language, setLanguage] = useState('English');
  const [therapy, setTherapy] = useState('Abhyanga');
  const instr = instructionsData[language][therapy];

  return (
    <div className="container my-4">
      <h3 className="mb-3">Therapy Instructions</h3>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <select className="form-select" value={therapy} onChange={(e) => setTherapy(e.target.value)}>
            <option>Abhyanga</option>
            <option>Virechana</option>
            <option>Vamana</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Pre-Therapy</h5>
        <p>{instr.pre}</p>
        <h5>Post-Therapy</h5>
        <p>{instr.post}</p>
      </div>
    </div>
  );
}
