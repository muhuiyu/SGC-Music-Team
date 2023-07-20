const admin = require('firebase-admin')
const fs = require('fs')

var serviceAccount = require('./music-team-roster-firebase-adminsdk.json')

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Create a new Firestore instance
const firestore = admin.firestore()

// Define the collection to export
const collectionName = 'songs'

// Define the output JSON file path
const jsonPath = 'songs_output.json'

// Export Firestore collection to JSON
async function exportToJson() {
  try {
    // Fetch the documents from the collection
    const snapshot = await firestore.collection(collectionName).get()

    // Prepare the data for JSON export
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Write the data to JSON
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
    console.log('Data exported to JSON successfully!')
  } catch (error) {
    console.error('Error exporting data to JSON:', error)
  }
}

// Call the exportToJson function
exportToJson()
