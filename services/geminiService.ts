import { GoogleGenAI, Type } from "@google/genai";
import { ShowRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const recommendationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The official name of the TV show.",
      },
      overview: {
        type: Type.STRING,
        description: "A brief, compelling summary of the show's plot.",
      },
      rating: {
        type: Type.NUMBER,
        description: "The user rating of the show on a scale from 0.0 to 10.0, with one decimal place.",
      },
    },
    required: ["name", "overview", "rating"],
  },
};

export async function getShowRecommendations(showName: string): Promise<ShowRecommendation[]> {
  try {
    const prompt = `10 tv shows like "${showName}". json. name, overview, rating out of 10. no fluff.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const recommendations = JSON.parse(jsonText);

    if (!Array.isArray(recommendations)) {
        throw new Error("API did not return a valid array.");
    }

    return recommendations as ShowRecommendation[];
  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    // Re-throw the original error so the UI layer can inspect it for more details.
    throw error;
  }
}
