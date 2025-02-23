
import { useState } from "react";
import "./register.css";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      console.error("Qeydiyyat Olunmadi:", data.message || "Xeta Bas Verdi");
      return;
    }
  
    console.log("Register olundu!", data);
  };

  return (
    <div className="register_container">
        <div className="register_box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
  );
}

export default Register;
