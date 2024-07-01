import { useState } from "react";
import axios from "axios";

const HandleSearch = () => {
  const [searchResult, setSearchResult] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (searchKey) => {
    setSearchLoading(true);
    setSearchResult({});
    try {
      const { data } = await axios.get(`/api/search?s=${searchKey}`);
      setSearchResult(data);
    } catch (error) {
      console.log("error has occurred");
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    searchResult,
    searchLoading,
    handleSearch,
  };
};

export default HandleSearch;
