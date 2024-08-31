const axios = require("axios");
exports.askQuery = async (req, res) => {
    try {
        const { prompt } = req.body;
        const model_type = "text_only";
        const response = await axios.post(`${process.env.GEMINI_SERVER_URL}/chat-with-gemini`, {
            prompt,
            modelType: model_type
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ Error: "Uh oh! Caught error while fetching AI response" });
        console.log("askQuery | error", error);

    }
};