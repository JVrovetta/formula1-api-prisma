import express from 'express'
import CarRouter from './src/routes/car.router'
import DriverRouter from './src/routes/driver.router'

const app = express()
app.use(express.json())

app.use('/car', CarRouter)
app.use('/driver', DriverRouter)

app.listen(3000, () => {
  console.log('ONLINE on port 3000');
})