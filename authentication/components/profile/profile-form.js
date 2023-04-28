import { useSession } from "next-auth/react";
import classes from "./profile-form.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

function ProfileForm() {
    const newPasswordRef = useRef();
    const oldPasswordRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/user/change-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                newPassword: newPasswordRef.current.value,
                oldPassword: oldPasswordRef.current.value,
            }),
        });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={newPasswordRef}
                    required
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="old-password">Old Password</label>
                <input
                    type="password"
                    id="old-password"
                    ref={oldPasswordRef}
                    required
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
