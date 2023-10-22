import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const DriverController = {
  async create(req: Request, res: Response) {
    try {
      const { cars, ...driverData }: { cars?: number[], name: string, number: number } = req.body
      const driver = await prisma.driver.create({
        data: {
          ...driverData,
          cars: {
            connect: cars?.map(carId => ({ id: carId }))
          }
        }
      })

      return res.status(200).json(driver)
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async readAll(req: Request, res: Response) {
    try {
      const drivers = await prisma.driver.findMany({
        select: {
          id: true,
          name: true,
          number: true,
          cars: { select: { id: true, manufacturer: true, model: true } }
        }
      })

      return res.status(200).json(drivers)
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async readOne(req: Request, res: Response) {
    try {
      const { id } = req.params
      const driver = await prisma.driver.findUnique({
        where: { id: +id },
        select: {
          id: true,
          name: true,
          number: true,
          cars: { select: { id: true, manufacturer: true, model: true } }
        }
      })

      if (driver) return res.status(200).json(driver)

      return res.status(404).send('Driver not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { cars, ...driverData }: { name?: string, number?: number, cars?: number[] } = req.body
      const driver = await prisma.driver.findUnique({ where: { id: +id } })

      if (driver) {
        const updatedDriver = await prisma.driver.update({
          where: { id: +id },
          data: {
            ...driverData,
            cars: { set: cars?.map(carId => ({ id: carId })) }
          }
        })

        return res.status(200).json(updatedDriver)
      }

      return res.status(404).send('Driver not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const driver = await prisma.driver.findUnique({ where: { id: +id } })

      if (driver) {
        await prisma.driver.delete({ where: { id: +id } })
        return res.status(200).send('Driver deleted successfully...')
      }

      return res.status(404).send('Driver not found...')
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

export default DriverController