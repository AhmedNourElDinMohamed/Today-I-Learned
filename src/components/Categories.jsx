import supabase from "../supabase";

const Categories = ({ categories, setFactsList, setLoading }) => {
  const filterData = (catName) => {
    let query = supabase.from("facts").select("*");
    if (catName !== "all") {
      query = query.eq("category", `${catName}`);
    }
    async function getData() {
      setLoading(true);
      const { data: facts, error } = await query
        .order("votes_Interesting", { ascending: false })
        .limit(1000);
      if (!error) {
        setFactsList(facts);
      } else alert("Problem To Fetch Data");
      setLoading(false);
    }
    getData();
  };

  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => filterData("all")}
          >
            All
          </button>
        </li>
        {categories.map((category) => {
          return (
            <li className="category" key={category.color}>
              <button
                className="btn btn-category"
                style={{
                  backgroundColor: category.color,
                }}
                onClick={() => filterData(category.name)}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Categories;
