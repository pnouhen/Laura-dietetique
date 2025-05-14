import "./homeCardObjectif.scss";

export default function HomeCardObjectif({ article, logo, title, text }) {
  return (
    <article className={`objectifCard ${article}`}>
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
