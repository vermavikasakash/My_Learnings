import axios from "axios";
import "dotenv/config";
import { Agent, tool, run } from "@openai/agents";
import { z } from "zod";

// structured output for db or api uses
const weatherSchema = z.object({
  city: z.string().describe("The name of the city"),
  degree: z.number().describe("The degree celcious of the temp"),
});

const getWeather = tool({
  name: "get_weather",
  description: "Return the weather for a given city.",
  parameters: z.object({ city: z.string().describe("name of city") }),
  async execute({ city }) {
    const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
    const response = await axios.get(url, { responseType: "text" });

    return `The weather of ${city} is ${response.data}`;
  },
});
// note we can create multiple tool

const agent = new Agent({
  name: "Weather bot",
  instructions: `You are a weather bot.

Whenever you use the weather tool, reproduce the tool output exactly.
Do not rephrase, summarize, add markdown, bullet points, or change the wording.`,
  model: "gpt-5.6",
  tools: [getWeather],
  //   outputType:weatherSchema,
});

async function main(query = "") {
  const result = await run(agent, query);
  console.log(result.finalOutput);
}
main("What is the weather of Bengaluru, Raebareli, Jammu kashmir");
