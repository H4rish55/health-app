const { z } = require("zod");

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assitant", "system"]),
        content: z.string().min(1),
      })
    )
    .min(1),
  context: z
    .object({
      model: z.enum(["heart", "diabetes", "stroke"]),
      prediction: z
        .object({
          label: z.string().optional(),
          probability: z.number().min(0).max(1).optional(),
        })
        .optional(),
      inputs: z.record(z.any()).optional(),
    })
    .optional(),
});

module.exports = chatSchema;
