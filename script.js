// Load dotenv package to access environment variables
require('dotenv').config();

const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Behave like a mermaid.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function chatWithGemini(input) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(input);
  console.log("Gemini Response:", result.response.text());
}

(async () => {
  const userInput = process.argv.slice(2).join(" ");  // Get input from terminal arguments
  if (!userInput) {
    console.log("Please provide input to chat with Gemini.");
    process.exit(1);
  }
  
  await chatWithGemini(userInput);
})();
