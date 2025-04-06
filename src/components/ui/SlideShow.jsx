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
    <>
      <GenerateReviews setData={setData} />
      <h2>Témoignages :</h2>
      {data ? (
        <>
          <i
            className="fa-solid fa-chevron-left"
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex - 3 + data.length) % data.length
              )
            }
          ></i>
          <div className="reviews">
            <Review index={currentIndex}></Review>
            <Review index={currentIndex + 1}></Review>
            <Review index={currentIndex + 2}></Review>
          </div>
          <i
            className="fa-solid fa-chevron-right"
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 3) % data.length)
            }
          ></i>
          <Dots></Dots>
        </>
      ) : (
        <p>Chargement en cours</p>
      )}
     
    </>
  );
}
