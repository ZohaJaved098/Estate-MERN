import { useSelector } from "react-redux";
import { useState } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
//WILL WORK ON IT LATER useEffect, useRef,
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  //   const fileRef = useRef(null);

  //   const [file, setFile] = useState(undefined);
  //   const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  //   const [uploadError, setUploadError] = useState(false);
  //   const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  //   useEffect(() => {
  //     if (file) {
  //       handleFileUpload(file); // ✅ pass the file
  //     }
  //   }, [file]);

  //   const handleFileUpload = async (file) => {
  //     setUploading(true);
  //     setUploadError(false);

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append(
  //       "upload_preset",
  //       import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  //     );

  //     try {
  //       const res = await fetch(
  //         `https://api.cloudinary.com/v1_1/dmmiehapo/image/upload
  // `,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       const data = await res.json();
  //       if (res.ok) {
  //         console.log("Upload successful:", data);
  // setAvatarUrl(data.secure_url);
  //       } else {
  //         throw new Error(data.error?.message || "Upload failed");
  //       }
  //     } catch (err) {
  //       console.error("Upload failed:", err);
  //       setUploadError(true);
  //     } finally {
  //       setUploading(false);
  //     }
  //   };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          // onChange={(e) => setFile(e.target.files[0])}
          type="file"
          //ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          //onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        {/* {uploading && (
          <p className="text-slate-500 text-sm text-center">
            Uploading image...
          </p>
        )}
        {uploadError && (
          <p className="text-red-500 text-sm text-center">
            Image upload failed!
          </p>
        )} */}

        {/* <p className="text-slate-500 text-sm text-center">
          You can click on the image to change image.
        </p> */}

        <input
          type="text"
          placeholder="UserName"
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
          className="border p-3 rounded-lg"
          autoComplete="false"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
          autoComplete="false"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? " Updating..." : "Update"}
        </button>
      </form>

      <div className=" flex justify-between items-center mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className=" text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "Updated Successfully" : ""}
      </p>
    </div>
  );
}
