export const get255CroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Output wajib 255x255
  const targetSize = 255;
  canvas.width = targetSize;
  canvas.height = targetSize;

  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,        // Sumber koordinat potong
    pixelCrop.width, pixelCrop.height, // Ukuran area yang dipotong
    0, 0,                            // Letak di canvas
    targetSize, targetSize           // Paksa jadi 255x255
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // Mengubah blob menjadi file agar punya nama
      const file = new File([blob], "skin_analysis.jpg", { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg", 0.95);
  });
};