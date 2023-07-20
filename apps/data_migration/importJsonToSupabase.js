const { createClient } = require('@supabase/supabase-js')
const { Pool } = require('pg')

// Initialize Supabase client
const supabaseUrl = 'https://lxnkjsazarmoeuyfhtqz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bmtqc2F6YXJtb2V1eWZodHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NDY1MzksImV4cCI6MjAwNTIyMjUzOX0.IxflI4fV5eD_QO85RQpmpUoTKYLVx7GzxrYYwgzQGeI'
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize PostgreSQL pool using Supabase credentials
const supabasePool = new Pool({
  connectionString: `${supabaseUrl}?auth=${supabaseKey}`,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Define the table name and JSON file path
const tableName = 'songs'
const jsonPath = './songs.json'

// Import JSON data to Supabase
async function importJsonToSupabase() {
  try {
    // Fetch JSON file
    // const response = await fetch(jsonPath)
    // const data = await response.json()
    const data = require(jsonPath)

    // Insert JSON data into Supabase table
    const { data: insertedData, error } = await supabase.from(tableName).upsert(data)

    if (error) {
      throw new Error(error.message)
    }

    console.log('JSON data imported to Supabase successfully!')
    console.log('Inserted data:', insertedData)
  } catch (error) {
    console.error('Error importing JSON data to Supabase:', error)
  }
}

// Call the importJsonToSupabase function
importJsonToSupabase()
