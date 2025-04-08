import "../../styles/dots.scss";

export default function Dots({ currentIndex, dataLength }) {
  // Calculate number of dots based on the number of reviews
  const numberOfDots = Math.ceil(dataLength / 3);

  return (
    <ul className="dots">
      {[...Array(numberOfDots)].map((_, index) => (
        <li
          key={index}
          className={index === Math.floor(currentIndex / 3) ? "active" : ""}
        />
      ))}
    </ul>
  );
}
