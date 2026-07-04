import React, { useState, useCallback } from "react";
import DashboardCard from "./DashboardCard";

const ALL_SYMPTOMS = [
  { emoji: "😣", label: "Cramps" },
  { emoji: "😴", label: "Fatigue" },
  { emoji: "🫠", label: "Bloating" },
  { emoji: "😤", label: "Mood swings" },
  { emoji: "🤕", label: "Headache" },
  { emoji: "🍫", label: "Cravings" },
  { emoji: "💧", label: "Heavy flow" },
  { emoji: "✨", label: "Feeling good" },
];

function SymptomLogger({ onSave }) {
  const [selected, setSelected] = useState([]);
  const [note, setNote] = useState("");

  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [foods, setFoods] = useState([]);
  const [remedies, setRemedies] = useState([]);
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleChip = useCallback(
    (label) => {
      if (loading) return;

      setSelected((prev) =>
        prev.includes(label)
          ? prev.filter((s) => s !== label)
          : [...prev, label]
      );
    },
    [loading]
  );

  const handleSave = useCallback(() => {
    if (loading) return;

    if (selected.length === 0 && note.trim() === "") return;

    const today = new Date().toISOString().split("T")[0];

    onSave({
      date: today,
      symptoms: selected,
      note: note.trim(),
    });

    setSelected([]);
    setNote("");
  }, [loading, note, selected, onSave]);

  const analyzeWithAI = useCallback(async () => {
    if (loading || note.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const resp = await fetch("http://127.0.0.1:8000/api/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: note,
        }),
      });

      if (!resp.ok) {
        throw new Error(await resp.text());
      }

      const data = await resp.json();

      setDetectedSymptoms(data.detected_symptoms || []);
      setFoods(data.recommended_foods || []);
      setRemedies(data.recommended_remedies || []);
      setArticles(data.related_articles || []);
    } catch (e) {
      console.error(e);
      setError("Unable to connect to AI service.");
    } finally {
      setLoading(false);
    }
  }, [loading, note]);

  return (
    <div className="symptom-card">

      <div style={{ textAlign: "center", marginBottom: 30 }}>

        <h1
          style={{
            fontSize: "2rem",
            marginBottom: 10,
            color: "#c85d7d",
          }}
        >
          💖 How are you feeling today?
        </h1>

        <p
          style={{
            color: "#666",
            maxWidth: "650px",
            margin: "auto",
            lineHeight: 1.6,
            fontSize: "15px",
          }}
        >
          Tell me your symptoms in your own words.
          Our AI will analyze them and recommend
          foods, remedies and useful health articles.
        </p>

      </div>

      <div
        className="chips-wrap"
        style={{
          justifyContent: "center",
          marginBottom: 25,
        }}
      >
        {ALL_SYMPTOMS.map(({ emoji, label }) => (
          <button
            key={label}
            className={`chip ${
              selected.includes(label) ? "selected" : ""
            }`}
            onClick={() => toggleChip(label)}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Example: I have severe cramps and feel very tired since morning..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        style={{
          width: "100%",
          borderRadius: "20px",
          padding: "18px",
          border: "1px solid #eee",
          resize: "none",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "25px",
        }}
      >

        <button
          className="btn-primary"
          onClick={analyzeWithAI}
          disabled={loading || note.trim() === ""}
          style={{
            padding: "14px 30px",
            borderRadius: "30px",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {loading ? "Analyzing..." : "🤖 Analyze with AI"}
        </button>

        <button
  className="btn-secondary"
  onClick={handleSave}
  disabled={
    loading ||
    (note.trim() === "" && selected.length === 0)
  }
  style={{
    padding: "14px 30px",
    borderRadius: "30px",
    fontWeight: "bold",
    fontSize: "15px",
  }}
>
  💾 Save Entry
</button>

      </div>

      {error && (
        <div
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <DashboardCard
        detectedSymptoms={detectedSymptoms}
        foods={foods}
        remedies={remedies}
        articles={articles}
        loading={loading}
        error={error}
      />

    </div>
  );
}

export default SymptomLogger;