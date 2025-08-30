const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
      <img
        src={book.image}
        alt={book.title}
        className="w-32 h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-gray-600 text-sm">{book.author}</p>
      <p className="text-sm text-gray-500">{book.year}</p>
      <p className="text-blue-600 font-bold mt-2">{book.price}تومان </p>
    </div>
  );
};

export default BookCard;
