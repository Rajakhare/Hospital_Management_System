require('dotenv').config()
const mongoose = require('mongoose')

console.log('Connecting to:', process.env.MONGODB)

mongoose.connect(process.env.MONGODB, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.log('❌ Failed:', err.message))