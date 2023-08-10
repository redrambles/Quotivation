import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import { Loader } from "react-feather";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const maxFaves = 3;
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(quotesUrl);
      const results = await response.json();
      setQuotes(results);
    } catch (e) {
      console.log("There was an error!", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredQuotes = category !== "All" ? quotes.filter((quote) => quote.categories.includes(category)) : quotes;

  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteId);

    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id);

    if (alreadyFavorite) {
      console.log("You already favorited this quote!");
    } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      console.log("Added to Favorites!");
    } else {
      console.log("Max number of quotes reached. Please delete one to add a new one.");
    }
  };

  const removeFromFavorites = (quoteId) => {
    const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId);
    setFavoriteQuotes(updatedFavorites);
  };

  return (
    <div className='App'>
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} mavFaves={maxFaves} removeFromFavorites={removeFromFavorites} />
        {loading ? (
          <Loader />
        ) : (
          <Quotes
            filteredQuotes={filteredQuotes}
            categories={categories}
            category={category}
            handleCategoryChange={handleCategoryChange}
            addToFavorites={addToFavorites}
            favoriteQuotes={favoriteQuotes}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
