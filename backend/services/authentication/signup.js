const { createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("./firebase");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const db = getFirestore();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

async function signUp(email, password, fullName, username) {
  try {
    // Create the user with email and password using Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Generate a unique token for verification
    const token = crypto.randomBytes(32).toString("hex");

    // Save user data and verification token to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      username,
      email,
      createdAt: new Date(),
      verified: false,
      verificationToken: token,
    });

    // Send verification email
    const verificationLink = `http://localhost:3000/api/auth/verify/${token}`;
    await sendVerificationEmail(email, verificationLink);

    return {
      success: true,
      message: "User created successfully. Please verify your email.",
    };
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "This email is already registered. Please use a different one.";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters.";
        break;
      default:
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

async function sendVerificationEmail(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Account",
    text: `Please click the link below to verify your account:\n\n${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { signUp };
