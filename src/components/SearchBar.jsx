import { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  // 엔터키로 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  // 버튼 클릭으로 검색
  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        검색
      </button>
    </div>
  );
}