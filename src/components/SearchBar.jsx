import { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
  const [input, setInput] = useState("");

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // 엔터 키를 눌렀을 때 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };

  // 검색 버튼 클릭 시 검색 실행
  const handleClick = () => {
    onSearch(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // 엔터 입력 감지
      />
      <button className="search-button" onClick={handleClick}>
        검색
      </button>
    </div>
  );
}