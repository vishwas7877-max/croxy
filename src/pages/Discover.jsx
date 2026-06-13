import SearchSection from "../components/SearchSection";
import TrendingMovies from "../components/TrendingMovies";
import TrendingAnime from "../components/TrendingAnime";
import AIRecommendations from "../components/AIRecommendations";

export default function Discover() {
  return (
    <>
      <SearchSection />
      <TrendingMovies />
      <TrendingAnime />
      <AIRecommendations />
    </>
  );
}