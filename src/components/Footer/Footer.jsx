import "./footer.scss";

export default function Footer() {
  return (
    <footer>
      <article className="contact">
        <h2>Contactez-moi :</h2>
        <div className="contact_container">
             <div className="adresse">
          <p className="subTitle">Adresse :</p>
          <a
            href="https://www.google.com/maps/place/Laura+Di%C3%A9t%C3%A9tique/@45.8506005,1.2463868,20.5z/data=!4m15!1m8!3m7!1s0x47fecb2d76075669:0x8895982de98b07fb!2s21+Rue+V%C3%A9drines,+87100+Limoges!3b1!8m2!3d45.8505717!4d1.2465095!16s%2Fg%2F11c18qsfnj!3m5!1s0x47fecb32b39cb9f9:0xb7bb1b7ae0a2e9ec!8m2!3d45.8506088!4d1.246543!16s%2Fg%2F11cs04h0nd?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            21 Rue Védrines, 87100 Limoges
          </a>
        </div>
        <div className="phone">
          <p className="subTitle">Téléphone :</p>
          <a href="tel:+33675669604">06.75.66.96.04</a>
        </div>
        <div className="email">
          <p className="subTitle">E-mail :</p>
          <a href="mailto:lauradietetique@gmail.com">
            lauradietetique@gmail.com
          </a>
        </div>
        </div>
       
      </article>
      <article className="followMe">
        <h2>Suivez-moi :</h2>
        <a href="https://www.facebook.com/Lauradietetique/">
          <img src="/assets/logo/facebook.webp" alt="Lien vers facebook" />
        </a>
        <a href="https://www.instagram.com/dietandmom/">
          <img src="/assets/logo/instagram.webp" alt="Lien vers instagram" />
        </a>
      </article>
    </footer>
  );
}
