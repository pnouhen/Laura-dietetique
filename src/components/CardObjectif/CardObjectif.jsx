import "./cardObjectif.scss";

export default function CardObjectif({ article, logo, title, text }) {
  return (
    <article className={article}>
      <i className={logo}></i>
      <h3
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </article>
  );
}
