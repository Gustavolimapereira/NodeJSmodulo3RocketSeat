import { Environment } from "vitest";

export default <Environment>(<unknown>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.log("Executou Setup");
    return {
      async teardown() {
        console.log("Teardown");
      },
    };
  },
});
