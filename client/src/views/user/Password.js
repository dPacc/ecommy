import React, { useState } from "react";
import { UserNav } from "../../components";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Successfully updated password");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            disabled={loading}
            value={password}
          />
          <button
            className="btn btn-primary"
            disabled={!password || loading || password.length < 6}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <h4>Updating</h4> : <h4>Password Update</h4>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
