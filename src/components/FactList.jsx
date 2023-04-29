import Fact from "./Fact";

const FactList = ({ factsList, setFactsList }) => {
  return (
    <section>
      <ul className="facts-list">
        {factsList.map((fact) => (
          <Fact fact={fact} key={fact.id} setFactsList={setFactsList} />
        ))}
      </ul>
      {factsList.length === 0 ? (
        <div className="message">No Facts In This Category</div>
      ) : (
        <p>There are {factsList.length} Facts in this category</p>
      )}
    </section>
  );
};

export default FactList;
