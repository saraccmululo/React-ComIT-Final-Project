import { useState } from 'react';
import { doPasswordReset } from "../../../firebase/authHelpers.js";
import styles from './ResetPassword.module.css';

const ResetPassword = ({ setIsResetPassword }) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [resetMessage, setResetMessage] = useState("");


	const handleResetPassword = async (e) => {
		e.preventDefault();
		try{
			await doPasswordReset(email);
			setResetMessage("A password rest link has been sent to your email address.")
			setError(null);    
		}catch (err){
			setError("failed to send reset email. Plase check your email address");
		}
	};

	return(
			<section>
				<h2 className={styles.resetH2}>Reset Your Password</h2>
				{error && <p className={styles.errorMessage}>{error}</p>}
				{resetMessage && <p>{resetMessage}</p>}
				<form onSubmit={handleResetPassword}>
					<input
					className={styles.resetInput}
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					/>
					<button className={styles.resetEmailButton} type="submit" >Send Reset Email</button>
				</form>
				<button className={styles.resetLoginButton} onClick={() => setIsResetPassword(false)}>Back to Login</button>
			</section>
	)
}

export default ResetPassword;