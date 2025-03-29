import React, { useState } from "react";
import axios from "axios";

const DiseasePredictor = () => {
  const [inputSymptoms, setInputSymptoms] = useState("");
  const [diseaseData, setDiseaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    const symptomsArray = inputSymptoms
      .split(",")
      .map((symptom) => symptom.trim().toLowerCase());

    if (symptomsArray.length === 0 || inputSymptoms === "") {
      setError("Please enter symptoms.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:3001/api/predict/p1", {
        symptoms: symptomsArray,
      });
      setDiseaseData(res.data);
    } catch (err) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Disease Predictor</h2>

      <input
        type="text"
        placeholder="Enter symptoms (comma-separated)"
        value={inputSymptoms}
        onChange={(e) => setInputSymptoms(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <button
        onClick={handlePredict}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Predict
      </button>

      {loading && <p className="mt-4">Predicting...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {diseaseData && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">{diseaseData.details.disease}</h3>
          <p><strong>Full Name:</strong> {diseaseData.details.general_info.full_name}</p>
          <p><strong>Description:</strong> {diseaseData.details.general_info.description}</p>
          <p><strong>Affected Age Groups:</strong> {diseaseData.details.general_info.affected_age_groups}</p>

          <h4 className="mt-4 font-semibold">Causes:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.causes_risks.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold">Risk Factors:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.causes_risks.risk_factors.map((risk, i) => (
              <li key={i}>{risk}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold">Precautionary Measures:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.precautionary_measures.preventive_steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          <p className="mt-2"><strong>Vaccine:</strong> {diseaseData.details.precautionary_measures.vaccines}</p>

          <h4 className="mt-4 font-semibold">Doctor Visit Guidelines:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.doctor_visit_guidelines.see_doctor_if.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold">Treatment:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.treatment.medications.map((med, i) => (
              <li key={i}>{med}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold">Home Remedies:</h4>
          <ul className="list-disc ml-6">
            {diseaseData.details.home_remedies.ayurvedic.map((rem, i) => (
              <li key={i}>{rem}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictor;
