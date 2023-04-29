import { useState } from "react";
import supabase from "../supabase";

const Fact = ({ fact, setFactsList }) => {
  const [update, setUpdate] = useState(false);
  const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];

  const isDisbuted =
    fact.votes_Interesting + fact.votes_Mindblowing < fact.votes_False;

  const handleVote = async (voteType) => {
    setUpdate(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [voteType]: fact[voteType] + 1 })
      .eq("id", fact.id)
      .select();
    setUpdate(false);
    if (!error)
      setFactsList((facts) =>
        facts.map((f) => {
          return f.id === fact.id ? updatedFact[0] : f;
        })
      );
  };

  return (
    <li className="fact" key={fact.id}>
      {isDisbuted ? <span className="disbuted">⛔Disbuted</span> : null}
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: `${
            CATEGORIES.find((item) => item.name === fact.category).color
          }`,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votes_Interesting")}
          disabled={update}
        >
          👍 {fact.votes_Interesting}
        </button>
        <button
          onClick={() => handleVote("votes_Mindblowing")}
          disabled={update}
        >
          🤯 {fact.votes_Mindblowing}
        </button>
        <button onClick={() => handleVote("votes_False")} disabled={update}>
          ⛔️ {fact.votes_False}
        </button>
      </div>
    </li>
  );
};

export default Fact;
