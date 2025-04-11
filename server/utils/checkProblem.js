import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const checkTest = async (data) => {
  let prompt;
  if (data.topic.includes("debug")) {
    prompt = `You are an expert debugger and code evaluator. Your task is to evaluate and debug the user's submitted code in ${
      data.language
    } based on the provided difficulty level.
    Input:
        1. **Debugging Question Description**: ${data.description}
        2. **Function Signature**: ${data.function}
        3. **Test Cases**: ${JSON.stringify(data.testCases, null, 2)}
        4. **User's Submitted Code**: ${data.code}
        5. **Difficulty Level**: ${data.level}
        6. **Language**: ${data.language}
    Instructions:
        - Analyze the submitted code for correctness based on the provided test cases.
        - Execute each test case using the user's code and compare the actual output with the expected output.
        - Identify and explain any issues, such as:
            - Logic errors
            - Syntax errors
            - Incorrect handling of edge cases
            - Misunderstood requirements
            - correct use data types and variables
        - Provide feedback on improvements the user can make, especially if the code passes all test cases.
    **Debugging Levels**:
        - **Basic**: Focus on common syntax errors, incorrect variable usage, and understanding of basic operations. Ensure the code implements fundamental functionality correctly.
        - **Intermediate**: Check for correct algorithm implementation, handling of edge cases, and efficiency issues. Ensure that functions handle diverse inputs and work within the time and space constraints.
        - **Advanced**: Look for optimization opportunities, performance issues, and ensure the solution is scalable. Focus on complex algorithms, data structures, and intricate edge cases.

    **If the code passes all test cases**:
    - Return:
    {
        "status": "pass",
        "message": "All test cases passed! Here are some suggestions to improve your code further:",
        "suggestions": [
            "Consider adding comments to explain key parts of the code for better readability.",
            "Optimize the solution for better performance, especially in edge cases.",
            "Ensure your code follows best practices, such as naming conventions and modularity.",
            "Test your code with more edge cases or large datasets to check for scalability."
        ]
    }

    **If the code fails any test case**:
    - Return:
    {
        "status": "fail",
        "message": "A detailed explanation of what went wrong and why",
        "failedCases": [
        {
            "input": "test case input",
            "expected": "expected output",
            "actual": "user's output",
            "error": "reason for failure"
        },...]
  } 

    Give the response in JSON format`;
  } else {
    prompt = `You are an expert debugger and code evaluator. Your task is to evaluate and debug the user's submitted code in ${
      data.language
    } based on the provided difficulty level..
          Input:
          1. **Question Description**: ${data.description}
          2. **Function Signature**: ${data.function}
          3. **Test Cases**: ${JSON.stringify(data.testCases, null, 2)}
          4. **User's Submitted Answer**: ${data.code}
          5. **Difficulty Level**: ${data.level}
        6. **Language**: ${data.language}
        
          Instructions:
          - Run the user's code against the test cases.
          - For each test case, report whether the output matches the expected value.
          - If the user's code fails, explain clearly:
          - What went wrong?
          - Which test cases failed?
          - Why it failed? (logic, edge cases, syntax)
          - If all test cases pass, respond with "status": "pass" and "message": "All test cases passed!".
          - If any test case fails, respond with "status": "fail" and a message explaining the issue.
          - Provide feedback on improvements the user can make, especially if the code passes all test cases.
            **Debugging Levels**:
          - **Basic**: Focus on common syntax errors, incorrect variable usage, and understanding of basic         operations. Ensure the code implements fundamental functionality correctly.
        
        **If the code passes all test cases**:
            - Return:
            {
                "status": "pass",
                "message": "All test cases passed!",
                "suggestions": "provide some suggestions to improve your code further with movition"
            }
        **If the code fails any test case**:
            - Return:
            {
                "status": "fail",
                "message": "A detailed explanation of what went wrong and why",
                "failedCases": [
                {
                    "input": "test case input",
                    "expected": "expected output",
                    "actual": "user's output",
                    "error": "reason for failure"
                },...]
    } Give the response in JSON format`;
  }

  const result = await model.generateContent(prompt);
  const res = await result.response.text();
  const startIndex = res.indexOf("{");
  const endIndex = res.lastIndexOf("}")+1;
  const json = res.substring(startIndex, endIndex);
//   console.log(json);
  return JSON.parse(json);
};

export default checkTest;
