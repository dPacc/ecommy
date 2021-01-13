import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { toast } from "react-toastify";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize the image
    const files = e.target.files;

    if (files) {
      setLoading(true);

      let allUploadedFiles = values.images;

      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // send the image to server to upload to cloudinary
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                // set url to images[] in parent component
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/removeimage`,
        { public_id: id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((image) => {
          return image.public_id !== id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((i) => (
            <Badge
              count="X"
              key={i.public_id}
              onClick={() => handleRemoveImage(i.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={i.url} size={100} className="m-3" shape="square" />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose File
          <input
            type="file"
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
