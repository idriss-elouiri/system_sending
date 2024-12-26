import React, { useState } from "react";

function App() {
  const [brand, setBrand] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // إرسال البيانات إلى الخادم
    const response = await fetch(`${API_URL}/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand, phone, message }),
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="App">
      <h1>إرسال رسالة نصية</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>اسم البراند:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <label>رقم الجوال:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>الرسالة:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">إرسال</button>
      </form>
    </div>
  );
}

export default App;
