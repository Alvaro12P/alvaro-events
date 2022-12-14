import { prisma } from '../src/utils/db'
import { logger } from '../src/utils/logger'
import { clients, events } from './seedData'

async function seed() {
  await prisma.client.deleteMany()
  logger.debug(`Deleted records in Client table`)

  await prisma.event.deleteMany()
  logger.debug(`Deleted records in Event table`)

  await prisma.$queryRaw`ALTER TABLE Client AUTO_INCREMENT = 1`
  logger.debug(`Reset Client autoincrement to 1`)

  await prisma.$queryRaw`ALTER TABLE Event AUTO_INCREMENT = 1`
  logger.debug(`Reset Event auto increment to 1`)

  await prisma.client.createMany({ data: clients })
  logger.debug(`Added Client data`)

  await prisma.event.createMany({ data: events })
  logger.debug(`Added Event data`)
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
