"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Greeting from "./components/Greeting";

Amplify.configure(outputs);

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Global Navigation Bar */}
          <nav style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            padding: "1rem", 
            backgroundColor: "#f4f4f4",
            borderBottom: "1px solid #ddd"
          }}>
            <div>
              <span style={{ marginRight: "20px", fontWeight: "bold", fontSize: "1.2rem" }}>My App</span>
              <Greeting userName={user?.signInDetails?.loginId || "User"} />
            </div>
            <button onClick={signOut} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Sign Out</button>
          </nav>
          
          {/* Page Content */}
          <main style={{ padding: "2rem", flex: 1 }}>
            {children}
          </main>
        </div>
      )}
    </Authenticator>
  );
}
