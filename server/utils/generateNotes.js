import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const GenerateNotes = async (data) => {
  const prompt = `Generate comprehensive study notes based on the following details:
    - Topic: ${data}
    The study notes should include:
    1. Topic Overview: A clear and concise summary of the topic.
    2. Key Concepts: A bullet-point list of the most important concepts related to the topic.
    3. Definitions: Any essential terms or jargon with clear definitions.
    4. Examples: Practical examples that illustrate key concepts.
    5. Step-by-step Explanation: Break down any complex processes or algorithms into simple, understandable steps.
    6. Best Practices: Provide some common best practices or tips related to the topic.
    7. Common Pitfalls: List any common mistakes or misconceptions related to the topic and how to avoid them.
    8. Visual Aids: Provide any diagrams or charts that help explain the topic (optional but recommended for complex topics).
    Return the study notes in a html and tailwind css format and give only body part of HTML file or add background color in Example part of HTML.
    `;

  const result = await model.generateContent(prompt);
  const res = await result.response.text();
  const startIndex = res.indexOf("<");
  const endIndex = res.lastIndexOf(">");
  const json = res.substring(startIndex, endIndex + 1);
  return json;
};

export default GenerateNotes;