import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// export interface GenerateContentResult {
//   response: {
//     candidates: Array<{
//       content: {
//         parts: Array<{
//           text: string;
//         }>;
//         role: string;
//       };
//       finishReason: string;
//       avgLogprobs: number;
//     }>;
//     usageMetadata: {
//       promptTokenCount: number;
//       candidatesTokenCount: number;
//       totalTokenCount: number;
//       promptTokensDetails: Array<{
//         modality: string;
//         tokenCount: number;
//       }>;
//       candidatesTokensDetails: Array<{
//         modality: string;
//         tokenCount: number;
//       }>;
//     };
//     modelVersion: string;
//   };
// }
