import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../api/auth";

const RegisterComplete = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, []);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate email and password
    if (!email || !password) {
      toast.error("Please enter a valid email or password");
      return;
    }

    // validate password length
    if (password.length < 6) {
      toast.error("Password must be greater than 6 characters");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // If the user has verified their email
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get user ID token as JWT
        let user = auth.currentUser;

        // update this users password
        user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store dispatch
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={handlePassword}
          autoFocus
          placeholder="Enter Password"
        />
        <br />
        <button type="submit" className="btn btn-raised">
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
