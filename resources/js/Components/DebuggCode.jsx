import React from "react";

export default function App() {
  const handleKeyDown = (e) => {
    console.log(`Key pressed: ${e.key} and ${e.target.value}`);
    if (e.key === "Enter") {
      alert("Enter key detected!");
    }
  };

  return (
    <div>
      <h1>Key Event Test</h1>
      <input type="text" onKeyDown={handleKeyDown} placeholder="Type and press Enter" />
    </div>
  );
}
