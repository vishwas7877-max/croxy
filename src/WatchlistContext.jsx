import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem(
      "croxy-watchlist"
    );

    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "croxy-watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  // ADD
  function addToWatchlist(item) {
    const exists = watchlist.find(
      (movie) => movie.id === item.id
    );

    if (!exists) {
      setWatchlist([...watchlist, item]);
    }
  }

  // REMOVE
  function removeFromWatchlist(id) {
    setWatchlist(
      watchlist.filter((item) => item.id !== id)
    );
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}