const NAME_OF_UPLOAD_PRESET = "jiiwjpkl";
const YOUR_CLOUDINARY_ID = "dzflw4umy";

// A helper function
async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload/`,
    {
      method: "POST",
      body: data
    }
  );
  const img = await res.json();
  return img.secure_url;
}

export default uploadImage