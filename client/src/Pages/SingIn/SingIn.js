import { Link } from "react-router-dom";
import "./SingIn.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/auth/google");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to initiate Google login");
    }
  };

  const handleSignUp = () => {
    // Handle Sign Up logic
    navigate("/register"); // Redirect to the Sign Up page
  };

  async function SendLogin(e) {
    e.preventDefault();
    const form = e.target,
      values = getAllValues(form);

    try {
      const result = await axios.post(
        "http://localhost:3000/user/login",
        values
      );

      form.reset();

      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        toast.success("Login success welcome back 😃", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data);
    }

    function getAllValues(form) {
      return Object.values(form).reduce((acc, curr) => {
        let { value, name } = curr;
        return name ? { ...acc, [name]: value } : acc;
      }, {});
    }
  }

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="social-container">
            <button className="social" onClick={handleGoogleLogin}>
              <FcGoogle size={25} className="react-icons" />
              Google
            </button>
          </div>
          <form onSubmit={SendLogin}>
            <h1>Log in to your account</h1>
            <h3>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="ghost"
                id="signUp"
                onClick={handleSignUp}
              >
                Sign Up
              </Link>{" "}
            </h3>

            <h4>or use your account</h4>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="SingIn" type="submit" value="Sing in">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container ">
          <div className="imgLogin"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
