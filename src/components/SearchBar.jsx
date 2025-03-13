import { useState } from "react";

export default function SearchBar ({placeholder, onSearch}) {
    const [inputValue, setInputValue] = useState ("");

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type = "text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button 
                onClick={handleSearch} 
                className = "bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                검색
            </button>
        </div>
    );
}