import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const CarController = {
  async create(req: Request, res: Response) {
    try {
      const carData: Prisma.CarCreateInput = req.body
      const car = await prisma.car.create({ data: carData })

      return res.status(200).json(car)
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async readAll(req: Request, res: Response) {
    try {
      const cars = await prisma.car.findMany({
        select: { id: true, manufacturer: true, model: true }
      })

      return res.status(200).json(cars)
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async readOne(req: Request, res: Response) {
    try {
      const { id } = req.params
      const car = await prisma.car.findUnique({
        where: { id: +id },
        select: { id: true, manufacturer: true, model: true }
      })

      if (car) return res.status(200).json(car)

      return res.status(404).send('Car not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const carData: Prisma.CarUpdateInput = req.body
      const car = await prisma.car.findUnique({ where: { id: +id } })

      if (car) {
        const updatedCar = await prisma.car.update({
          where: { id: +id },
          data: carData
        })
        return res.status(200).json(updatedCar)
      }

      return res.status(404).send('Car not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const car = await prisma.car.findUnique({ where: { id: +id } })

      if (car) {
        await prisma.car.delete({ where: { id: +id } })
        return res.status(200).send('Car deleted successfully...')
      }

      return res.status(404).send('Car not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  },
}

export default CarController