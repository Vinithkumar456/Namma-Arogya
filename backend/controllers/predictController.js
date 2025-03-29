const axios = require("axios");
const { getGeminiResponse } = require("../services/geminiService");

exports.predictDisease = async (req, res) => {
    try {
        // Step 1: Send Symptoms to Flask ML Model
        const mlResponse = await axios.post("http://127.0.0.1:5000/predict", req.body);
        const { predicted_disease, matched_symptoms } = mlResponse.data;

        // Step 2: Get Additional Info from Gemini AI
        const geminiResponse = await getGeminiResponse(predicted_disease);

        // Step 3: Combine ML & Gemini Response
        res.json({
            predicted_disease, // ✅ Keeping original keys consistent
            details: geminiResponse
        });
    } catch (error) {
        console.error("Error in Prediction:", error);
        res.status(500).json({ error: "Prediction process failed" });
    }
};
