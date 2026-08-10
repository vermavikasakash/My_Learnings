import { Agent } from "@openai/agents";

const bookingAgent = new Agent({
  name: "Booking Agent",
  instructions: "Help users with booking requests.",
});

const refundAgent = new Agent({
  name: "Refund Agent",
  instructions: "Process refund requests politely and efficiently.",
});

// Use Agent.create method to ensure the finalOutput type considers handoffs or RECOMMENDED_PROMPT_PREFIX
const receptionAgent = new Agent({
  name: "Reception Agent",
  instructions:
    `${RECOMMENDED_PROMPT_PREFIX} Help the user with their questions.
  If the user asks about booking, hand off to the booking agent.
  If the user asks about refunds, hand off to the refund agent.`.trimStart(),
  handoffDescription: `You have two agents available:
    - salesAgent: Expert in handling queries like all plans and pricing available. Good for new customers.
    - refundAgent: Expert in handling user queries for existing customers and issue refunds and help them
  `,
  handoffs: [bookingAgent, refundAgent],
});

async function main(query = "") {
  const result = await run(receptionAgent, query);
  console.log(`Result`, result.finalOutput);
  //   console.log(`History`, result.history);
}

main("Hi There, I want to know about bookings.");
