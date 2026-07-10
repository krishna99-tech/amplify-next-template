import type { Schema } from "../../data/resource";

export const handler: Schema["helloWorld"]["functionHandler"] = async (event, context) => {
  const { name } = event.arguments;
  return `Hello, ${name || "World"}! from Lambda.`;
};
