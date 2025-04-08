import { useState } from "react";
import GenerateReviews from "../pages/services/GenerateReviews";
import Review from "./Review";
import Dots from "./Dots";
import "../../styles/slideShow.scss";

export default function SlideShow() {
  // Change Reviews
  const [currentIndex, setCurrentIndex] = useState(0);
  //   Generate the reviews.json
  const [data, setData] = useState(null);

  return (
    <section className="slideshow">
      <GenerateReviews setData={setData} />
      <h2>Avis :</h2>
      {data ? (
        <>
          <div className="slideShow_container">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex - 3 + data.length) % data.length
                )
              }
            ></i>
            <Review index={currentIndex}></Review>
            <Review index={currentIndex + 1}></Review>
            <Review index={currentIndex + 2}></Review>
            <i
              className="fa-solid fa-chevron-right"
              onClick={() =>
                setCurrentIndex((prevIndex) => (prevIndex + 3) % data.length)
              }
            ></i>
          </div>
          <Dots currentIndex={currentIndex} dataLength={data.length}></Dots>
        </>
      ) : (
        <p>Chargement en cours</p>
      )}
    </section>
  );
}
