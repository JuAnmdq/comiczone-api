import mongoose from 'mongoose'

// mongodb client connection
async function connect() {
  try {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }

    await mongoose.connect(String(process.env.MONGODB_URI), options)
    console.log('Mongodb connection stablished')
  } catch (error) {
    console.log('Error:', error.message)
  }
}

async function disconnect() {
  try {
    await mongoose.connection.close()
  } catch (error) {
    console.log('Error:', error.message)
  }
}

function resetCollection(collection: string) {
  if (mongoose.connection.collection(collection).countDocuments()) {
    mongoose.connection.collection(collection).deleteMany({})
  }
}

export default {
  connect,
  disconnect,
  resetCollection,
}
