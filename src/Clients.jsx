import { useEffect, useState } from "react";
import "./Clients.css";

const API = import.meta.env.VITE_API_URL;

export default function Clients() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${API}/clients`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(Array.isArray(json) ? json : []);
      })
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red", textAlign: "center" }}>Error: {err}</p>;
  if (!data) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (data.length === 0) return <p style={{ textAlign: "center" }}>No clients found.</p>;

  return (
    <main className="clients-page">
      <h1 className="clients-title">Clientele</h1>

      <div className="clients-grid">
        {data.map((client) => {
          const logo = client.logo_url?.includes("res.cloudinary.com")
            ? client.logo_url.replace("/upload/", "/upload/f_auto,q_auto/")
            : client.logo_url;

          return (
            <article key={client.id} className="client-card">
            
                <img
                  src={logo}
                  alt={client.name}
                  className="client-logo"
                />
             
            </article>
          );
        })} 
      </div>

      <a
        href="https://brandbanao.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="clients-link"
      >
        Tap to View more...
      </a>

      <hr className="clients-divider" />
    </main>
  );
}
