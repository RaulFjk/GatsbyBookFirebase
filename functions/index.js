const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.postComment = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  const snapshot = await db
      .collection("publicProfiles")
      .where("userId", "==", context.auth.uid)
      .limit(1)
      .get();
      
        // Because we limit the results to one, we can directly access doc[0]
  await db.collection("comments").add({
       text: data.text,
       username: snapshot.docs[0].id,
       dataCreated: new Date(),
       book: db.collection("books").doc(data.bookId),
  });
});




