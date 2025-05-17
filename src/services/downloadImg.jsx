export function downloadImg(e, setData) {
  const file = e.target.files[0];
  if (file && file.type === "image/webp") {
    const reader = new FileReader();
    reader.onloadend = () => {
      setData(prev => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  } else {
    alert("Seul le format .webp est autorisé.");
  }
}