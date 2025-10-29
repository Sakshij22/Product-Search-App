import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  // Fetch data from DummyJSON API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter + Sort Logic
  let displayedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === "asc") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="app-container">
      <h1>🛍️ Product Search & Listing App</h1>

      {/* Search and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {displayedProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>💲 {p.price}</p>
            <p>⭐ {p.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
