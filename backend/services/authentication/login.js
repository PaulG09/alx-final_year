const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("./firebase");

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      },
    };
  } catch (error) {
    let errorMessage = "An error occurred during login.";
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/user-disabled":
        errorMessage = "This user has been disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "User not found.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        break;
      default:
        errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

module.exports = { login };
