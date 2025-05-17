import "./labelSelect.scss";

export default function LabelSelect({ title, id,value, onChange, data }) {
  return (
    <div className="labelSelect">
      <label htmlFor={id}>{title}</label>
      <select name={id} id={id} value={value} onChange={onChange}>
        <option value="" disabled hidden></option>
        {data.map((item, i) => (
          <option key={i}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
