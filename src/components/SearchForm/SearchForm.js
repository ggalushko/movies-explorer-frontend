import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onFilterChange, isFilterOn }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section
      className="search-form"
      aria-label="Секция с поиском и фильтрацией"
    >
      <form
        className="search-form__form"
        id="search-and-filter"
        action="#"
        name="search-and-filter"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search-form__search"
          form="search-and-filter"
          name="search"
          placeholder="Фильм"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <button
          className="search-form__btn-submit hover-button"
          type="submit"
          form="search-and-filter"
        >
          Поиск
        </button>
        
      </form>
      <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
        />
    </section>
  );
}

export default SearchForm;
