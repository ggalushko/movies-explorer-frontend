import "./FilterCheckbox.css";
function FilterCheckbox({ onFilterChange, isFilterOn, isSearching }) {
  return (
    <label className="filter-checkbox">
      Короткометражки
      <input
        className="filter-checkbox__toggle"
        form="search-and-filter"
        name="toggle"
        type="checkbox"
        disabled={isSearching ? true : false}
        checked={isFilterOn}
        onChange={(evt) => onFilterChange(evt.target.checked)}
      />
      <span className="filter-checkbox__track"></span>
    </label>
  );
}

export default FilterCheckbox;
