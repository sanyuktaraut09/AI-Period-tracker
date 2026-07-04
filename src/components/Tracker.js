import { useState } from "react";

// 🌿 Recommendation data (ADD AT TOP)
const recommendations = {
  cramps: {
    food: ["Dark chocolate", "Spinach", "Banana"],
    remedies: ["Use heating pad", "Drink ginger tea"]
  },
  fatigue: {
    food: ["Nuts", "Banana", "Oats"],
    remedies: ["Take rest", "Stay hydrated"]
  },
  bloating: {
    food: ["Cucumber", "Watermelon"],
    remedies: ["Avoid salty food", "Drink warm water"]
  }
};
const articles = [
  {
    title: "How to reduce menstrual cramps",
    content: "Cramps can be managed with heat, hydration and light exercise",
    tags: ["cramps", "pain", "stomach pain"]
  },
  {
    title: "Best foods for fatigue during periods",
    content: "Fatigue can be reduced with iron-rich foods and hydration",
    tags: ["fatigue", "tired", "low energy"]
  },
  {
    title: "Why bloating happens before periods",
    content: "Hormonal changes cause water retention and bloating",
    tags: ["bloating", "pms", "swelling"]
  }
];

function Tracker() {
  const [date, setDate] = useState("");
  const [symptom, setSymptom] = useState("");
  const [entries, setEntries] = useState([]);
  const [result, setResult] = useState(null); // ⭐ new state
  const [articleResults, setArticleResults] = useState([]);

  const handleSubmit = () => {
    if (!date || !symptom) {
      alert("Please fill all fields");
      return;
    }

    const newEntry = {
      date: date,
      symptom: symptom
    };

    // store entry
    setEntries([...entries, newEntry]);

    // 🌿 recommendation logic
    const lowerSymptom = symptom.toLowerCase();

    if (recommendations[lowerSymptom]) {
      setResult(recommendations[lowerSymptom]);
    } else {
      setResult({
        food: ["Stay healthy"],
        remedies: ["Consult a doctor if needed"]
      });
    }
   // 📚 Smarter matching
const userWords = lowerSymptom.split(" ");

const matchedArticles = articles.map(article => {
  let score = 0;

  article.tags.forEach(tag => {
    userWords.forEach(word => {
      if (tag.includes(word)) {
        score++;
      }
    });
  });

  return { ...article, score };
})
.filter(article => article.score > 0)
.sort((a, b) => b.score - a.score);

setArticleResults(matchedArticles);

    // clear inputs
    setDate("");
    setSymptom("");
  };
  

  return (
    <div style={{
  maxWidth: "500px",
  margin: "40px auto",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
}}>
      <h3>Track Your Period</h3>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter symptoms (cramps, fatigue...)"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Add Entry</button>

      {/* ✅ ENTRIES SECTION */}
      <div style={{ marginTop: "20px" }}>
  <h3>Your Entries</h3>

  <ul style={{ listStyle: "none", padding: 0 }}>
    {entries.map((entry, index) => (
      <li key={index} style={{
        background: "#ffe6f0",
        margin: "5px 0",
        padding: "10px",
        borderRadius: "8px"
      }}>
        {entry.date} - {entry.symptom}
      </li>
    ))}
  </ul>
</div>

      {/* ✅ RECOMMENDATIONS SECTION */}
      {result && (
  <div style={{
    marginTop: "20px",
    background: "#fff0f5",
    padding: "15px",
    borderRadius: "10px"
  }}>
    <h3>🌿 Recommendations</h3>

    <p><b>Foods:</b></p>
    <ul>
      {result.food.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <p><b>Remedies:</b></p>
    <ul>
      {result.remedies.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}
{articleResults.length > 0 && (
  <div style={{
    marginTop: "20px",
    background: "#f9f9ff",
    padding: "15px",
    borderRadius: "10px"
  }}>
    <h3>📚 Related Articles</h3>

    {articleResults.map((article, index) => (
      <div key={index} style={{
        marginBottom: "10px",
        padding: "10px",
        background: "#ffffff",
        borderRadius: "8px"
      }}>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default Tracker;