import "./label.scss"

export default function Label({className, htmlFor, label, type, id, ref}){
    return(
        <div className={className}>
            <label htmlFor={htmlFor}>{label}</label>
            <input type={type} id={id} ref={ref} />
          </div>
    )
}