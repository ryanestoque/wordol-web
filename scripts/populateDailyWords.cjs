const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const words = require('../words.json');
const fs = require('fs');
const path = require('path');

// To run this, you need a serviceAccountKey.json file from your Firebase project settings.
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error("Please place your Firebase serviceAccountKey.json in the root directory of the project.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function populateWords() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Start today at midnight local time

  console.log(`Starting to populate words from ${startDate.toISOString()}...`);

  const daysToPopulate = Math.min(365, words.length);
  
  let batch = db.batch();
  let count = 0;

  for (let i = 0; i < daysToPopulate; i++) {
    const wordDate = new Date(startDate);
    wordDate.setDate(wordDate.getDate() + i);
    
    // Format YYYY-MM-DD
    const yyyy = wordDate.getFullYear();
    const mm = String(wordDate.getMonth() + 1).padStart(2, '0');
    const dd = String(wordDate.getDate()).padStart(2, '0');
    const dateString = `${yyyy}-${mm}-${dd}`;

    const docRef = db.collection('daily_words').doc(dateString);
    batch.set(docRef, {
      word: words[i],
      date: Timestamp.fromDate(wordDate)
    });

    count++;

    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`Committed ${count} words...`);
    }
  }

  if (count % 400 !== 0) {
    await batch.commit();
  }

  console.log(`Successfully populated ${count} daily words!`);
}

populateWords().catch(console.error);
