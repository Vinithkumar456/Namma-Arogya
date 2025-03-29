const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getGeminiResponse = async (disease) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a highly accurate and medically knowledgeable AI. Given a disease name, provide structured details in proper JSON format.
        Include the following sections:

        1️⃣ **General Information:**
            - Full name of the disease
            - Brief description of the disease (cause, affected organs, type of infection if applicable)
            - Common age groups affected

        2️⃣ **Symptoms:**
            - List the most common symptoms
            - Severity level (Mild, Moderate, Severe)

        3️⃣ **Causes & Risk Factors:**
            - Possible causes (bacterial, viral, genetic, environmental, etc.)
            - Major risk factors (lifestyle, genetics, exposure to pollutants, etc.)

        4️⃣ **Precautionary Measures:**
            - Preventive steps to reduce risk
            - Vaccines (if available)
            - General hygiene and diet recommendations

        5️⃣ **When to See a Doctor:**
            - Signs that indicate urgent medical attention is needed
            - Home management tips for mild cases

        6️⃣ **Home Remedies (India-Specific):**
            - Ayurvedic, herbal, or home-based remedies specific to Indian households
            - Traditional drinks, herbs, or diet suggestions

        7️⃣ **Treatment Options:**
            - Over-the-counter medications (if applicable)
            - Common prescription medications
            - Lifestyle modifications
            - Recovery time (estimated)

        8️⃣ **Example JSON Response Format:**
        {
            "disease": "Dengue Fever",
            "general_info": {
                "full_name": "Dengue Hemorrhagic Fever",
                "description": "A mosquito-borne viral infection causing flu-like illness and severe complications in some cases.",
                "affected_age_groups": "All ages, but more severe in children and elderly."
            },
            "symptoms": {
                "common": ["High fever", "Severe headache", "Pain behind the eyes", "Joint pain", "Skin rash"],
                "severity_level": "Moderate to Severe"
            },
            "causes_risks": {
                "causes": ["Dengue virus transmitted by Aedes mosquitoes"],
                "risk_factors": ["Living in tropical regions", "Standing water near homes", "Weak immune system"]
            },
            "precautionary_measures": {
                "preventive_steps": ["Use mosquito repellents", "Wear full-sleeve clothes", "Avoid stagnant water"],
                "vaccines": "Dengvaxia (approved in some countries)",
                "hygiene_diet_tips": ["Stay hydrated", "Eat Vitamin C-rich fruits"]
            },
            "doctor_visit_guidelines": {
                "see_doctor_if": ["High fever persists for more than 3 days", "Severe vomiting", "Bleeding from gums or nose"],
                "home_management": ["Drink ORS", "Rest well", "Use cold compress for fever"]
            },
            "home_remedies": {
                "ayurvedic": ["Drink papaya leaf juice", "Consume Giloy (Tinospora cordifolia) extract"],
                "traditional_indian_remedies": ["Drink coconut water", "Consume turmeric and honey"]
            },
            "treatment": {
                "medications": ["Paracetamol (avoid aspirin & ibuprofen)"],
                "prescription_treatment": "Hospitalization in severe cases",
                "recovery_time": "1-2 weeks with proper care"
            }
        }

        📌 **Output must be a valid JSON object.**
        📌 **Do not add extra text outside JSON format.**
        📌 **Ensure JSON is properly formatted without syntax errors.**
        
        Now, generate details for the disease: **${disease}**.
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response;
        let text=await responseText.text();
        console.log("Raw API Response:", text); // Debugging

        // ✅ Clean the response (remove markdown formatting or unwanted characters)
        text = text.replace(/```json|```/g, "").trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { error: "Failed to get data from Gemini AI" };
    }
};
