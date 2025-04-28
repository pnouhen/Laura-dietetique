import { useState, useEffect } from "react";
import { fetchData } from "../../service/FetchData";
import Review from "../Review/Review";
import Dots from "../Dots/Dots";
import "./slideShow.scss";

export default function SlideShow() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  
  useEffect(() => {
    fetchData("/public/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((error) => console.error("Error lors du fetch:", error))
  }, []);
  
  useEffect(() => {
    const resize = () => setVisible(window.innerWidth <= 1024 ? 1 : 3);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  
  return (
    <section className="slideshow">
      <h2>Avis :</h2>
      { reviews.length > 0 ? (
        <>
          <div className="slideShow_container">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setIndex((index - visible + reviews.length) % reviews.length)
              }
            ></i>
            
            {Array.from({ length: visible }).map((_, i) => {
              const current = (index + i) % reviews.length;
              return (
                <Review
                  key={i}
                  review={reviews[current]}
                />
              );
            })}
            
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => setIndex((index + visible) % reviews.length)}
            ></i>
          </div>
          
          <Dots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={visible}
          />
        </>
      ) : (
        <div className="error-container dataNull">
          <p>Aucun avis disponible pour le moment.</p>
        </div>
      )}
    </section>
  );
}