"use client";

import { useEffect, useState } from "react";

export default function AdminEarlyAccess() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/early-access")
      .then((r) => r.json())
      .then((d) => setRequests(d.requests || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#050608", minHeight: "100vh", color: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <a href="/" style={{ color: "#64748B", fontSize: 13, textDecoration: "none" }}>← Back to site</a>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 8 }}>
          Early Access Requests
        </h1>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 32 }}>
          {loading ? "Loading..." : `${requests.length} total requests`}
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>#</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>Full Name</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>Email</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>Date</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                  <td style={{ padding: "12px 16px", color: "#334155", fontFamily: "monospace" }}>{i + 1}</td>
                  <td style={{ padding: "12px 16px" }}>{r.full_name}</td>
                  <td style={{ padding: "12px 16px", color: "#60A5FA" }}>{r.email}</td>
                  <td style={{ padding: "12px 16px", color: "#94A3B8", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                    {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#64748B", fontFamily: "monospace" }}>{r.ip_address || "—"}</td>
                </tr>
              ))}
              {!loading && requests.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "40px 16px", textAlign: "center", color: "#334155" }}>
                    No requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
