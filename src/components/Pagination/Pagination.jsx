import "./pagination.scss";

export default function Pagination({
  counter,
  setIndex,
  index,
  visible,
  data,
  textPrev,
  textNext,
  hideButtonsWhenExtreme = false // défaut : non masqué
}) {
  const handlePrev = () =>
    setIndex((index - visible + data.length) % data.length);
  const handleNext = () => setIndex((index + visible) % data.length);

  const isFirstPage = index === 0;
  const isLastPage = index + visible >= data.length;

  return (
    <div className="pagination">
      {(!hideButtonsWhenExtreme || !isFirstPage) && (
        <div className="pagination-prev" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
          <p>{textPrev}</p>
        </div>
      )}

      <p className="counter">{counter}</p>

      {(!hideButtonsWhenExtreme || !isLastPage) && (
        <div className="pagination-next" onClick={handleNext}>
          <p>{textNext}</p>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      )}
    </div>
  );
}
