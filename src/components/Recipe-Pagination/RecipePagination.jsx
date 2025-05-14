import "./recipePagination.scss";

export default function RecipePagination({ currentPage, totalPages, isFirstPage, isLastPage, handlePrev, handleNext }) {
  return (
    <div className="pagination">
      {!isFirstPage && (
        <button className="pagination-prev" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
          <p>Précédant</p>
        </button>
      )}

      <p className="counter">
        Page {currentPage} sur {totalPages}
      </p>

      {!isLastPage && (
        <button className="pagination-next" onClick={handleNext}>
          <p>Suivant</p>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}