import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Mita Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
