const FilterSidebar = ({
  searchTerm,
  setSearchTerm,
  selectedGenres,
  setSelectedGenres,
  priceRange,
  setPriceRange,
  yearRange,
  setYearRange,
  sortOption,
  setSortOption,
}) => {
  const genres = ["تاریخ/انسان شناسی", "سیاسی", "رمان", "فلسفه", "تاریخ"];
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">فیلترها</h2>
      {/* search--------------------------------------------------------------- */}
      <input
        type="text"
        placeholder="جستجوی نویسنده کتاب"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* Genre----------------------------------------------------------------  */}
      <div>
        <h3 className="font-semibold mb-2">ژانر</h3>
        {genres.map((genre) => (
          <label key={genre} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
              className="mr-2"
            />
            {genre}
          </label>
        ))}
      </div>
      {/* Price-----------------------------------------------------------------  */}
      <div>
        <h3 className="font-semibold mb-2">بازه قیمت (تومان)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="حداقل"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="w-1/2 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="حداکثر"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="w-1/2 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* year range --------------------------------------------------  */}
      <div>
        <h3 className="font-semibold mb-2">سال انتشار</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="از"
            value={yearRange.min}
            onChange={(e) =>
              setYearRange({ ...yearRange, min: e.target.value })
            }
            className="w-1/2 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="تا"
            value={yearRange.max}
            onChange={(e) =>
              setYearRange({ ...yearRange, max: e.target.value })
            }
            className="w-1/2 border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* !Reset button ---------------------------------------------------------*/}
      <button
        onClick={() => {
          setSearchTerm("");
          setSelectedGenres([]);
          setPriceRange({ min: "", max: "" });
          setYearRange({ min: "", max: "" });
        }}
        className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        حذف تمام فیلترها
      </button>
      {/* !Sort -------------------------------------------- */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">مرتب سازی</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- انتخاب کنید --</option>
          <option value="price-asc">قیمت: ارزان به گران</option>
          <option value="price-desc">قیمت: گران به ارزان</option>
          <option value="year-desc">سال انتشار: جدیدترین</option>
          <option value="year-asc">سال انتشار: قدیمی‌ترین</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
