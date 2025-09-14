const OpenAI = require("openai");
const chatSchema = require("../models/chat.model");
const { SYSTEM_PROMPT, OPENAI_API } = require("../config/envVars");

const openai = new OpenAI({
  apiKey: OPENAI_API,
});

const chatBot = async (req, res) => {
  try {
    const parsed = chatSchema.parse(req.body);
    const { messages, context } = parsed;

    const contextBlock = context
      ? [
          `CONTEXT_START`,
          `model: ${context.model ?? "unknown"}`,
          `prediction.label: ${context?.prediction?.label ?? "n/a"}`,
          `prediction.probability: ${context?.prediction?.prob ?? "n/a"}`,
          `inputs: ${JSON.stringify(context?.inputs ?? {})}`,
          `CONTEXT_END`,
        ].join("\n")
      : "NO_CONTEXT";

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: contextBlock },
        ...messages,
      ]
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n"),
    });

    res.status(200).json({
      success: true,
      reply: response.output_text ?? "",
      usage: response.usage ?? null,
    });
  } catch (error) {
    console.log("Error in chatbot controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = chatBot;
