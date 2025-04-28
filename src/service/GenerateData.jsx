import { useEffect } from "react";

export default function GenerateData({url, setData}) {
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [url, setData]);
  return
}
