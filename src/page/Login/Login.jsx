import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        if (user.emailVerified) {
          navigate(from, { replace: true });
          Swal.fire("welcome!!", "login Successfully ", "success");
          reset();
        } else {
          Swal.fire("Thank You!!", "Please Verify Your Email First ", "info");
          reset();
        }
        reset();
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          setIsGoogleLogin(true);
          navigate(from, { replace: true });
          Swal.fire("welcome!!", "login Successfully ", "success");
        } else {
          Swal.fire("sorry", "you are not registered", "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleResetModalOpen = () => {
    setShowResetModal(true);
  };

  const handleResetModalClose = () => {
    setShowResetModal(false);
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handlePasswordReset = (email) => {
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          // No user found with the provided email address
          Swal.fire(
            "User Not Found",
            "There is no user associated with this email address.",
            "error"
          );
        } else {
          // User found, send password reset email
          sendPasswordResetEmail(auth, email)
            .then(() => {
              Swal.fire(
                "Password Reset Email Sent",
                "Please check your email to reset your password.",
                "success"
              );
            })
            .catch((error) => {
              setLoginError(error.message);
            });
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  return (
    <>
      <main className="relative py-10 bg-gray-900 lg:mb-24">
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-cyan-400 font-semibold">LOGIN</h3>
            <p className="text-white text-3xl font-semibold sm:text-4xl">
              Get Connected
            </p>
            <p className="text-gray-300">
              We’d love to hear from you! Please fill out the form bellow.
            </p>
          </div>
          <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    {...register("email", {
                      required: isGoogleLogin
                        ? false
                        : "Email Address is required",
                    })}
                  />
                  {errors.email && !isGoogleLogin && (
                    <p
                      role="alert"
                      className="mt-3 text-indigo-500 text-center"
                    >
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    {...register("password", {
                      required: isGoogleLogin ? false : "Password is required",
                      minLength: {
                        value: 8,
                        message: "password must be 8 characters or longer.",
                      },
                    })}
                  />
                  {errors.password &&
                    !isGoogleLogin && ( // Don't show error for Google login
                      <p
                        role="alert"
                        className="mt-3 text-indigo-500 text-center"
                      >
                        {errors.password?.message}
                      </p>
                    )}
                </div>
                <div>
                  {loginError && (
                    <p className="mt-3 text-indigo-500 text-center p-3">
                      {loginError}
                    </p>
                  )}
                </div>

                <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                  Log in
                </button>

                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                  <span className="relative bg-white px-4 text-sm text-gray-400">
                    Log in with social
                  </span>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="bg-gray-100 p-4">
                <div className="flex items-center justify-center">
                  <p className="text-center text-sm text-gray-500">
                    Do not have an account?{" "}
                    <a
                      href="/signup"
                      className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-center mt-3">
                  <p className="text-center text-sm text-gray-500">
                    Forget Password?{" "}
                    <a
                      onClick={handleResetModalOpen}
                      className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Reset Password
                    </a>
                  </p>
                </div>
              </div>
              {/* Modal for password reset */}
              {showResetModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>

                    <div
                      className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div>
                        <div className="mt-2">
                          <label
                            htmlFor="email"
                            className="block text-xl font-bold text-gray-700 text-center mb-5"
                          >
                            Your Email Address ?
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring text-center"
                            value={resetEmail}
                            onChange={handleResetEmailChange}
                          />
                        </div>
                      </div>
                      <div className="mt-2 mx-auto flex gap-5">
                        <button
                          type="button"
                          className="mt-5 inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-indigo-500 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          onClick={() => {
                            handlePasswordReset(resetEmail);
                            handleResetModalClose();
                          }}
                        >
                          Reset Password
                        </button>
                        <button
                          type="button"
                          className="mt-5 inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          onClick={handleResetModalClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </main>
    </>
  );
};

export default Login;
