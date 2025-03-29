import React, { useState } from "react";

const SymptomVoiceInput = () => {
  const [speechText, setSpeechText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [details, setDetails] = useState(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setSpeechText(result);

      // Send the speech to backend for prediction
      fetch("http://localhost:3001/api/predict/p1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: result }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPrediction(data.predicted_disease);
          setDetails(data.details);

          // Read the result aloud
          const utter = new SpeechSynthesisUtterance(
            `You have symptoms of ${data.predicted_disease}. Here are the details: `
          );
          speechSynthesis.speak(utter);

          // Read detailed information aloud
          speakDetails(data.details);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const speakDetails = (data) => {
    const generalInfo = data.general_info;
    const symptoms = data.symptoms;
    const causes = data.causes_risks;
    const precautions = data.precautionary_measures;
    const treatment = data.treatment;

    // Speaking general information
    const generalUtterance = new SpeechSynthesisUtterance(
      `The disease is called ${generalInfo.full_name}. ${generalInfo.description}. It affects primarily ${generalInfo.affected_age_groups}.`
    );
    speechSynthesis.speak(generalUtterance);

    // Speaking common symptoms
    const symptomsUtterance = new SpeechSynthesisUtterance(
      `Common symptoms include: ${symptoms.common.join(", ")}. The severity level of symptoms is ${symptoms.severity_level}.`
    );
    speechSynthesis.speak(symptomsUtterance);

    // Speaking causes and risks
    const causesUtterance = new SpeechSynthesisUtterance(
      `The main cause of this disease is ${causes.causes.join(", ")}. Risk factors include: ${causes.risk_factors.join(", ")}.`
    );
    speechSynthesis.speak(causesUtterance);

    // Speaking preventive measures
    const precautionUtterance = new SpeechSynthesisUtterance(
      `To prevent this, follow these steps: ${precautions.preventive_steps.join(", ")}. Also, it's important to maintain good hygiene and a healthy diet.`
    );
    speechSynthesis.speak(precautionUtterance);

    // Speaking treatment
    const treatmentUtterance = new SpeechSynthesisUtterance(
      `The main treatment for this disease is ${treatment.medications.join(", ")}. In addition, medications should be prescribed based on individual needs. The recovery time varies based on individual conditions.`
    );
    speechSynthesis.speak(treatmentUtterance);

    // Handling recovery_time
    if (Array.isArray(treatment.recovery_time)) {
      const recoveryUtterance = new SpeechSynthesisUtterance(
        `The recovery time is estimated as: ${treatment.recovery_time.join(", ")}.`
      );
      speechSynthesis.speak(recoveryUtterance);
    } else {
      // If recovery_time is not an array, handle it as a string
      const recoveryUtterance = new SpeechSynthesisUtterance(
        `The recovery time is: ${treatment.recovery_time}.`
      );
      speechSynthesis.speak(recoveryUtterance);
    }

    // Optional: Speak doctor visit guidelines if needed
    const doctorVisitUtterance = new SpeechSynthesisUtterance(
      `Visit a doctor if you experience any of the following symptoms: ${data.doctor_visit_guidelines.see_doctor_if.join(", ")}. You can also manage some symptoms at home by following these guidelines: ${data.doctor_visit_guidelines.home_management.join(", ")}.`
    );
    speechSynthesis.speak(doctorVisitUtterance);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🩺 Voice-Based Symptom Input</h2>
      <p>Click below and speak your symptoms:</p>
      <button onClick={startListening} style={{ padding: "10px 20px" }}>
        🎙️ Start Listening
      </button>
      <p style={{ marginTop: "20px" }}>
        <strong>You said:</strong> {speechText}
      </p>

      {/* Display predicted disease and other details */}
      {prediction && (
        <div>
          <h3>Prediction: {prediction}</h3>
          <div style={{ textAlign: "left", marginTop: "20px", color: "#333" }}>
            {details && (
              <>
                <h4>General Information:</h4>
                <p><strong>Full Name:</strong> {details.general_info.full_name}</p>
                <p><strong>Description:</strong> {details.general_info.description}</p>
                <p><strong>Affected Age Groups:</strong> {details.general_info.affected_age_groups}</p>

                <h4>Symptoms:</h4>
                <p>{details.symptoms.common.join(", ")}</p>
                <p><strong>Severity Level:</strong> {details.symptoms.severity_level}</p>

                <h4>Causes and Risks:</h4>
                <p>{details.causes_risks.causes.join(", ")}</p>
                <p><strong>Risk Factors:</strong> {details.causes_risks.risk_factors.join(", ")}</p>

                <h4>Precautionary Measures:</h4>
                <p>{details.precautionary_measures.preventive_steps.join(", ")}</p>
                <p><strong>Hygiene and Diet Tips:</strong> {details.precautionary_measures.hygiene_diet_tips.join(", ")}</p>

                <h4>Treatment:</h4>
                <p>{details.treatment.medications.join(", ")}</p>
                <p><strong>Prescription Treatment:</strong> {details.treatment.prescription_treatment.join(", ")}</p>

                <h4>Recovery Time:</h4>
                <p>{Array.isArray(details.treatment.recovery_time) ? details.treatment.recovery_time.join(", ") : details.treatment.recovery_time}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomVoiceInput;
