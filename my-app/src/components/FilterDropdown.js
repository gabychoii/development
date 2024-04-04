function FilterDropdown({ setLanguageFilter, setGenreFilter, languages, genres }) {
    return (
      <div className="filterDropdown">
        <select onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="">Language: All</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>
        <select onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">Genre: All</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    );
  }
export default FilterDropdown;