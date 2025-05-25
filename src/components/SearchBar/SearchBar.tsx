import { FaSearch } from "react-icons/fa";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

type SearchBarProps = {
  onSubmit: (query: string) => void;
};
const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const errorMessage = () => {
    toast("Enter text to search", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "#f87171",
        color: "#1f2937",
        padding: "14px 20px",
        borderRadius: "12px",
        fontWeight: "500",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "320px",
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      errorMessage();
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.inputWrapper}>
          <button className={s.iconButton} type="submit">
            <FaSearch />
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
