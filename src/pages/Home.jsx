import { useState } from "react";
import books from "../db/books";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
  // !for search 👇
  const [searchTerm, setSearchTerm] = useState("");
  // !for search Genres 👇
  const [selectedGenres, setSelectedGenres] = useState([]);
  // !for search Price 👇
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  // !For year range 👇
  const [yearRange, setYearRange] = useState({ min: "", max: "" });
  // !for Sort 👇
  const [sortOption, setSortOption] = useState("");
  // !for Pagination 👇
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const filteredBooks = books.filter((book) => {
    // !search 👇
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    // !genre 👇
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    // !price 👇
    const matchesPrice =
      (priceRange.min === "" || book.price >= Number(priceRange.min)) &&
      (priceRange.max === "" || book.price <= Number(priceRange.max));
    // !year 👇
    const matchesYear =
      (yearRange.min === "" || book.year >= Number(yearRange.min)) &&
      (yearRange.max === "" || book.year <= Number(yearRange.max));
    //  !returns ➡️
    return matchesSearch && matchesGenre && matchesPrice && matchesYear;
  });
  // !Sort condition 👇
  if (sortOption === "price-asc") {
    filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredBooks.sort((a, b) => b.price - a.price);
  } else if (sortOption === "year-asc") {
    filteredBooks.sort((a, b) => a.year - b.year);
  } else if (sortOption === "year-desc") {
    filteredBooks.sort((a, b) => b.year - a.year);
  }
  // !Pagination  👇
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        {/* added all props ---------------- */}
        <FilterSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          yearRange={yearRange}
          setYearRange={setYearRange}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>

      {/* book list  */}
      <div className="md:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination  */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
