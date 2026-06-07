require('dotenv').config()
const mongoose = require('mongoose')


console.log('Connecting to:', process.env.MONGODB) // add this line

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ Failed:', err.message))