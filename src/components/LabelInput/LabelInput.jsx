import "./labelInput.scss";

export default function LabelInput({
  className,
  htmlFor,
  label,
  value,
  onChange,
  type,
  id,
  ref,
}) {
  return (
    <div className={`labelInput ${className}`}>
      <label htmlFor={htmlFor}>{label} </label>
      <input type={type} id={id} ref={ref} value={value} onChange={onChange} />
    </div>
  );
}
