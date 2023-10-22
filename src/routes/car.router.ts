import { Router } from "express";
import CarController from "../controllers/car.controller";

const CarRouter = Router()

// Car C.R.U.D
CarRouter.post('/', CarController.create)
CarRouter.get('/', CarController.readAll)
CarRouter.get('/:id', CarController.readOne)
CarRouter.put('/:id', CarController.update)
CarRouter.delete('/:id', CarController.delete)

export default CarRouter