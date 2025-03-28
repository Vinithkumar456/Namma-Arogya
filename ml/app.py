from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load trained model and label encoder
model = joblib.load("disease_predictor.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Get expected feature names from the trained model
expected_features = list(model.feature_names_in_)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    # Create a DataFrame filled with zeros
    input_data = pd.DataFrame(np.zeros((1, len(expected_features))), columns=expected_features)

    # Try to match user symptoms with model's feature names
    matched_symptoms = []
    for symptom in symptoms:
        matched_feature = next((f for f in expected_features if symptom.lower() in f.lower()), None)
        if matched_feature:
            input_data[matched_feature] = 1
            matched_symptoms.append(matched_feature)

    if not matched_symptoms:
        return jsonify({"error": "None of the provided symptoms match the trained dataset"}), 400

    # Predict using the trained model
    try:
        prediction = model.predict(input_data)[0]
        predicted_disease = label_encoder.inverse_transform([prediction])[0]
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {e}"}), 500

    return jsonify({
        "predicted_disease": predicted_disease,
        "matched_symptoms": matched_symptoms
    })

if __name__ == "__main__":
    app.run(debug=True)
