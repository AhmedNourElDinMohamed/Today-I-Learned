import { useState } from "react";
import supabase from "../supabase";

const FactForm = ({ categories, setShowForm, setfactsList }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resetFields = () => {
      setText("");
      setSource("");
      setCategory("");
    };

    const isValidUrl = (urlString) => {
      var urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // validate fragment locator
      return !!urlPattern.test(urlString);
    };

    if (text && text.length < 200 && isValidUrl(source) && category) {
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      if (!error) setfactsList((prev) => [newFact[0], ...prev]);
    }
    resetFields();
    setShowForm(false);
  };
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        defaultValue={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {categories.map((category) => {
          return (
            <option key={category.name} value={category.name}>
              {category.name.toUpperCase()}
            </option>
          );
        })}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
};

export default FactForm;
