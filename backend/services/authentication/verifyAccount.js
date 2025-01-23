const {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} = require("firebase/firestore");
const db = getFirestore();

async function verifyAccount(token) {
  // Create a query to find the user with the matching verification token
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("verificationToken", "==", token));

  // Get the documents that match the query
  const userSnapshot = await getDocs(q);

  if (userSnapshot.empty) {
    throw new Error("Invalid verification token.");
  }

  const userDoc = userSnapshot.docs[0]; // Get the first document
  const userData = userDoc.data();

  // Mark the user as verified and remove the verification token
  await updateDoc(doc(db, "users", userDoc.id), {
    verified: true,
    verificationToken: null, // Clear the token after successful verification
  });

  return userData; // Return user data for session creation or further use
}

module.exports = { verifyAccount };
