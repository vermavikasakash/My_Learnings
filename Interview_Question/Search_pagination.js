import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  const limit = 5;

  // Debounce input (important for interview)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
      setPage(1); // reset page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const fetchData = async () => {
    const skip = (page - 1) * limit;

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${debouncedInput}&limit=${limit}&skip=${skip}`
    );

    const data = await res.json();

    setProducts(data.products);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedInput]);

  const pageHandler = (idx) => {
    setPage(idx + 1);
  };

  const btnCount = Math.ceil(total / limit);

  return (
    <div>
      <h2>Product List</h2>

      {/* Search Input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
      />

      {/* Product List */}
      {products.length > 0 &&
        products.map((d) => (
          <div key={d.id}>
            <p>{d.title}</p>
          </div>
        ))}

      {/* Pagination */}
      <div>
        {[...Array(btnCount)].map((_, i) => (
          <button key={i} onClick={() => pageHandler(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;