import { Router } from "express";
import DriverController from "../controllers/driver.controller";

const DriverRouter = Router()

// Driver C.R.U.D
DriverRouter.post('/', DriverController.create)
DriverRouter.get('/', DriverController.readAll)
DriverRouter.get('/:id', DriverController.readOne)
DriverRouter.put('/:id', DriverController.update)
DriverRouter.delete('/:id', DriverController.delete)

export default DriverRouter