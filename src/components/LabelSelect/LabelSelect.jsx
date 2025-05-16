import "./labelSelect.scss";

export default function LabelSelect({ title, id, data }) {
  return (
    <div className="labelSelect">
      <label htmlFor={id}>
        {title}
      </label>
      <select name={id} id={id}>
        {data.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
