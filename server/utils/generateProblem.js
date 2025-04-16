import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const checkCodeTopic = async (data) => {
  const prompt = `Check the given topic "${data.topic}" whether it is related to coding or not. Send response "Yes" or "No" in JSON format. Like
  {
    "response": "value"
  }
  `;

  const result = await model.generateContent(prompt);
  const res = await result.response.text();
  const startIndex = res.indexOf("{");
  const endIndex = res.lastIndexOf("}");
  const json = JSON.parse(res.substring(startIndex, endIndex + 1));
  if (json.response === "Yes") {
    const problem = await generateProblem(data);
    return {
      problem,
      response: "Yes",
    };
  } else {
    return {
      response: "No",
    };  
  }
}

const generateProblem = async (data) => {
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

export default checkCodeTopic