import app from './src/app.js'
import db from './src/db.js'

const port = process.env.PORT || 3000

db.connect()

app.listen(port, () => {
  console.log('Listening on port', port)
})

export default app
