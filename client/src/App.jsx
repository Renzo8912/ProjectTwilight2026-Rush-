import { useState } from "react";
import axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Replace this with the URL from your image_17db67.png browser bar
    const backendUrl = "https://cautious-space-xylophone-5gq94v7w4rp62vq6p-5000.app.github.dev/items";

    try {
      const response = await axios.post(backendUrl, { name: itemName });
      console.log("Success:", response.data);
      alert("Item saved to ReneExperimental Database!");
      setItemName(""); // Clear the input
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Project Twilight Inventory</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default App;