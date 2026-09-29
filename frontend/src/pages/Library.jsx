import { useEffect, useState } from "react";
import API from "../services/api";
import "./Library.css";

function Library() {
  const [books, setBooks] = useState([]);
const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
  title: "",
  author: "",
  category: "",
  status: "Available"
});
  const fetchBooks = async () => {
    try {
      const response = await API.get("/books", {
        params: { search }
      });

      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handleAddBook = async (e) => {
  e.preventDefault();

  try {
    await API.post("/books", formData);

    setFormData({
      title: "",
      author: "",
      category: "",
      status: "Available"
    });

    setShowForm(false);
    fetchBooks();
  } catch (error) {
    console.error("Failed to add book:", error);
    alert("Failed to add book");
  }
};

  useEffect(() => {
    fetchBooks();
  }, [search]);

  return (
    <div className="library-page">

      <header className="library-header">
        <div>
          <h1>📚 Library</h1>
          <p>Manage your books in one place.</p>
        </div>

       <button
  className="add-book-button"
  onClick={() => setShowForm(!showForm)}
>
  + Add Book
</button>
      </header>

      <div className="library-content">

        {showForm && (
  <form className="book-form" onSubmit={handleAddBook}>
    <input
      type="text"
      placeholder="Book title"
      value={formData.title}
      onChange={(e) =>
        setFormData({ ...formData, title: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Author"
      value={formData.author}
      onChange={(e) =>
        setFormData({ ...formData, author: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Category"
      value={formData.category}
      onChange={(e) =>
        setFormData({ ...formData, category: e.target.value })
      }
      required
    />

    <select
      value={formData.status}
      onChange={(e) =>
        setFormData({ ...formData, status: e.target.value })
      }
    >
      <option value="Available">Available</option>
      <option value="Issued">Issued</option>
    </select>

    <button type="submit">Add Book</button>
  </form>
)}

        <input
          className="search-input"
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>

              <div className="book-icon">📖</div>

              <h3>{book.title}</h3>

              <p className="book-author">
                {book.author}
              </p>

              <p className="book-category">
                {book.category}
              </p>

              <span
                className={
                  book.status === "Available"
                    ? "status available"
                    : "status issued"
                }
              >
                {book.status}
              </span>

              <div className="book-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Library;