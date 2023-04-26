import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";

const createUser = async (email, password) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            try {
                const result = await createUser(
                    emailRef.current.value,
                    passwordRef.current.value
                );
                console.log(result);
                emailRef.current.value = "";
                passwordRef.current.value = "";
            } catch (err) {
                console.log(err);
            }
        } else {
            const result = await signIn("credentials", {
                redirect: false,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            console.log(result);
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        required
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? "Login" : "Create Account"}</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
