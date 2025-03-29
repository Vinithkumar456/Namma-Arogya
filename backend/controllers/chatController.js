const model = require('../config/geminiConfig'); 
const cleanResponse = (response) => {
    return response
        .replace(/[\n*]/g, '')  
        .replace(/\s+/g, ' ')   
        .trim();                
};

const medicalChat = async (req, res) => {
    try {
        
        const { prompt, category } = req.body;
        let fullPrompt=`Your a doctor and I face this issue: ${prompt} ,
        Please give me a solution on this within 100 words.
        If I text anything other than medical stuffs tell me this is a invalid question to ask`

        
        const result = await model.generateContent(fullPrompt);
        const response=await result.response;
        const  text=await response.text();
        const cleanedText = cleanResponse(text);


        
        res.json(cleanedText); 

    } catch (error) {
        
        console.error("Error in career chat:", error);
        res.status(500).json({ error: error.message || "Failed to generate response" });
    }
};

module.exports = { medicalChat };
