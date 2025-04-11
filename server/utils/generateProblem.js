import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateTest = async (data) => {
  const prompt = `Create a coding challenge based on the following details:
    - Topic: ${data.topic}  
    - Difficulty Level: ${data.level}  

    The output should include:
    1. A clear and concise **problem title**.
    2. Give **problem description** .
    3. A **function signature** in ${data.language} with a comment line saying "// Your code here".
    4. Give only 2 **test cases** with:
        - "Input:" and "Expected:" format.

    Respond only in the following JSON format:
    {
      "title": "string",
      "description": "string",
      "function_signature": "string",
      "test_cases": [
        { "Input": "value", "Expected": "value" },
        { "Input": "value", "Expected": "value" }
      ],
    }
    `;

  const result = await model.generateContent(prompt);
  const res = await result.response.text();
  const startIndex = res.indexOf("{");
  const endIndex = res.lastIndexOf("}");
  const json = res.substring(startIndex, endIndex + 1);
  //   console.log(JSON.parse(json));
  return JSON.parse(json);
};

export default generateTest;