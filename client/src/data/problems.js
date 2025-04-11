export const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    starterCode: `function twoSum(nums: number[], target: number): number[] {
    // Your code here
}`,
    testCases: [
      '[2,7,11,15], 9',
      '[3,2,4], 6',
      '[3,3], 6'
    ],
    topic: "Arrays",
    language: "TypeScript"
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    starterCode: `function reverseString(s: string[]): void {
    // Your code here
}`,
    testCases: [
      '["h","e","l","l","o"]',
      '["H","a","n","n","a","h"]'
    ],
    topic: "Strings",
    language: "TypeScript"
  }
];

export const PROBLEM_TOPICS = [
  "Arrays",
  "Strings",
  "LinkedList",
  "Trees",
  "Dynamic Programming",
  "Debugging"
];

export const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++"
];