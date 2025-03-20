
const SortFilter = ({ sortBy, filterType, filterText, setSortBy, setFilterType, setFilterText, isHomepage }) => {

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="sortFilterContainer">
      <label>Sort by:</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="none">None</option>
        <option value="alphabetical">Alphabetical</option>
        {!isHomepage && <option value="date">Creation Date</option>}
      </select>
      
      <label>Filter by:</label>
      <select value={filterType} onChange={handleFilterChange}>
        <option value="none">None</option>
        <option value="common-name">Common name</option>
        <option value="scientific-name">Scientific Name</option>
      </select>

      <input
        type="text"
        placeholder="Search plants..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
    </div>
  );
};

export default SortFilter;
