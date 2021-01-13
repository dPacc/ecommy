import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
  };

  return (
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
  );
};

export default FileUpload;
