"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function Greeting({ userName }: { userName: string }) {
  const [greeting, setGreeting] = useState("Loading greeting...");

  useEffect(() => {
    // Automatically call Lambda when this component loads
    client.queries.helloWorld({ name: userName }).then(({ data, errors }) => {
      if (data && !errors) {
        setGreeting(data);
      } else {
        setGreeting("Welcome, " + userName);
      }
    }).catch(() => {
      setGreeting("Welcome, " + userName);
    });
  }, [userName]);

  return <span style={{ fontWeight: "bold" }}>{greeting}</span>;
}
