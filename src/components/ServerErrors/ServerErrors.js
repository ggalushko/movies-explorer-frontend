import "./ServerErrors.css";

function ServerErrors({ isEditingBegun, place }) {
  return (
    <p
      className={`server-errors server-errors_place_${place} ${
        isEditingBegun ? "server-errors_active" : ""
      }`}
    >
      Произошла ошибка, попробуйте еще раз
    </p>
  );
}

export default ServerErrors;
