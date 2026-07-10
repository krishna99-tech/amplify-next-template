"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./../app/app.css";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [lambdaResponse, setLambdaResponse] = useState<string | null>(null);
  
  // We can get the user info using useAuthenticator from the context provided by AuthWrapper
  const { user } = useAuthenticator((context) => [context.user]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({
        content,
        isDone: false,
      });
    }
  }

  function toggleTodo(id: string, isDone: boolean | null | undefined) {
    client.models.Todo.update({
      id,
      isDone: !isDone,
    });
  }

  async function callLambda() {
    const name = window.prompt("Enter your name for the Lambda greeting");
    const { data, errors } = await client.queries.helloWorld({
      name: name || "Anonymous",
    });
    if (!errors) {
      setLambdaResponse(data);
    } else {
      console.error(errors);
      setLambdaResponse("Error calling Lambda");
    }
  }

  return (
    <div>
      <h1>{user?.signInDetails?.loginId ? `${user.signInDetails.loginId}'s todos` : "My todos"}</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id, todo.isDone)}
            style={{ cursor: "pointer", textDecoration: todo.isDone ? "line-through" : "none" }}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={callLambda}>Call Lambda Function</button>
        {lambdaResponse && <p style={{ marginTop: 10, fontWeight: "bold" }}>{lambdaResponse}</p>}
      </div>
    </div>
  );
}
