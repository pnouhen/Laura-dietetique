import "./formReview.scss"

export default function FormReview({
  divFormReview,
  htmlFor,
  classNameSpan,
  remainingChars,
  id,
  ref,
  onChange,
  maxLength
}) {
  return (
    <div className={divFormReview}>
      <label htmlFor={htmlFor}>Votre avis</label>
      <span className={classNameSpan}>
        Caractères restant : {remainingChars}
      </span>
      <textarea
        id={id}
        ref={ref}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
