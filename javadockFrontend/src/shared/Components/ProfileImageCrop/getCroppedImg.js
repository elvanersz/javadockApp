export const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  
  const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
  
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas boş döndü!"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };
  
  export default getCroppedImg;
  