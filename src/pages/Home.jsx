import { useState } from "react";
import books from "../db/books";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
  // !for search
  const [searchTerm, setSearchTerm] = useState("");
  // !for search Genres
  const [selectedGenres, setSelectedGenres] = useState([]);
  // !for search Price
  const [priceRange, setPriceReng] = useState({ min: "", max: "" });

  const filteredBooks = books.filter((book) => {
    // !search
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    // !genre
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    // !price
    const matchesPrice =
      (priceRange.min === "" || book.price >= Number(priceRange.min)) &&
      (priceRange.max === "" || book.price <= Number(priceRange.max));
    //  !returns
    return matchesSearch && matchesGenre && matchesPrice;
  });
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        {/* added all in here */}
        <FilterSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          priceRange={priceRange}
          setPriceReng={setPriceReng}
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
