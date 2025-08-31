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
  // !Sort 👇
  const [sortOption, setSortOption] = useState("");

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

      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">فروشگاه کتاب</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-gray-600">هیچ کتابی پیدا نشد</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
