function SortDropdown({ sortByReleaseYear, setSortByReleaseYear }) {
    return (
      <div className="sortDropdown">
        <select
          id="sortReleaseYear"
          value={sortByReleaseYear}
          onChange={(e) => setSortByReleaseYear(e.target.value)}
        >
          <option value="">Sort by:</option>
          <option value="ascending">Release Date: Ascending</option>
          <option value="descending">Release Date: Descending</option>
        </select>
      </div>
    );
  }
  
  export default SortDropdown;