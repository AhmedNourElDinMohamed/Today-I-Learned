import supabase from "./supabase";
// Components
import Header from "./components/Header";
import FactForm from "./components/FactForm";
import Categories from "./components/Categories";
import FactList from "./components/FactList";
// Style
import "./style.css";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  // << Variables >> //
  const [showForm, setShowForm] = useState(false);
  const [factsList, setFactsList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .order("votes_Interesting", { ascending: false })
        .limit(1000);
      if (!error) {
        setFactsList(facts);
      } else alert("Problem To Fetch Data");
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <>
      <Header showForm={() => setShowForm(!showForm)} toggleBtn={showForm} />
      {showForm && (
        <FactForm
          categories={CATEGORIES}
          setfactsList={setFactsList}
          setShowForm={setShowForm}
        />
      )}
      <main className="main">
        <Categories
          categories={CATEGORIES}
          setFactsList={setFactsList}
          setLoading={setLoading}
        />
        {loading ? (
          <Loader />
        ) : (
          <FactList factsList={factsList} setFactsList={setFactsList} />
        )}
      </main>
    </>
  );
}

export default App;
