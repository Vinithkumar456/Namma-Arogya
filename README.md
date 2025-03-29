# Namma Arogya

## Overview
Namma Arogya is a smart healthcare application that predicts diseases based on symptoms using a machine learning model and provides relevant information such as precautions, home remedies, and whether to consult a doctor. It also integrates a chat interface for doctor consultations and supports voice-based input and output for an enhanced user experience.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Machine Learning:** Python (Random Forest Algorithm)
- **AI Services:** Gemini API

## Features
- **Disease Prediction:**
  - Users input symptoms, and the Random Forest model predicts the possible disease.
  - Prediction results are transferred to the Gemini API for further insights.
- **Health Guidance:**
  - Provides information about precautions, home remedies, and recommendations on whether to consult a doctor.
- **Doctor Consultation Chat:**
  - Users can communicate with doctors regarding symptoms and receive medical advice.
- **Voice-Based Input & Output:**
  - Supports voice input for symptoms.
  - Provides voice output for disease predictions and recommendations.

## Project Workflow
1. **User Inputs Symptoms:** Via text or voice.
2. **Disease Prediction:** Random Forest model predicts possible diseases.
3. **Enhanced Insights:** Predicted disease data is sent to Gemini API for additional information.
4. **Recommendations:** The system provides details on home remedies, precautions, and doctor consultation necessity.
5. **Chat with Doctor:** Users can discuss symptoms and receive medical advice.
6. **Voice Assistance:** Users can interact with the system using voice input and receive voice responses.

## Setup Instructions
### Backend (Node.js & Express)
1. Clone the repository:
   ```bash
   https://github.com/Vinithkumar456/Namma-Arogya.git
   cd namma-arogya
   ```
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend (React.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

### Machine Learning Service (Python)
1. Navigate to the ML service directory:
   ```bash
   cd ml
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the ML service:
   ```bash
   python app.py
   ```

## API Endpoints
### Disease Prediction
```
POST /predict
{
  "symptoms": ["fever", "cough", "headache"]
}
Response:
{
  "disease": "Flu"
}
```

### Chat with Doctor
```
POST /chat
{
  "message": "What should I do for a sore throat?"
}
Response:
{
  "response": "Try warm salt water gargles and stay hydrated. If it persists, consult a doctor."
}
```

## Future Enhancements
- Integration of more AI models for better predictions.
- Multi-language support for voice and text inputs.
- Enhanced UI/UX for a more seamless user experience.


## License
This project is licensed under the MIT License.
