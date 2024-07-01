import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Search from "./Search";
import Movie from "./Movie";

function Authenticated() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile isOwner={true} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/u/:pusername" element={<Profile isOwner={false} />} />
        <Route path="/m/:imdbId" element={<Movie />} />
      </Routes>
    </>
  );
}

export default Authenticated;
