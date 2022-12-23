import { Prisma } from '@prisma/client'

export const clients: Prisma.ClientUncheckedCreateInput[] = [
  {
    name: 'Test 1',
    phone: '111111111'
  },
  {
    name: 'Test 2',
    phone: '222222222'
  },
  {
    name: 'Test 3',
    phone: '333333333'
  }
]
const address =
  'https://www.google.com/maps/place/The+Pentagon/@38.871861,-77.0584556,17z/data=!3m2!4b1!5s0x89b7b7a32f363b2d:0x1c5f7b0ee3bc814d!4m5!3m4!1s0x89b7b6df29ed2c27:0xaf83d0f8c013532f!8m2!3d38.8718568!4d-77.0562669'

export const events: Prisma.EventUncheckedCreateInput[] = [
  {
    address,
    deposit: false,
    price: 150,
    km: 12.4,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2000'
  },
  {
    address,
    deposit: true,
    price: 200,
    km: 13.5,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2024'
  },
  {
    address,
    deposit: false,
    price: 180,
    km: 9.9,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 2,
    date: '22/09/2024'
  },
  {
    address,
    deposit: true,
    price: 300,
    km: 26.6,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 3,
    date: '22/09/2024'
  },
  {
    address,
    deposit: false,
    price: 150,
    km: 12.4,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2024'
  },
  {
    address,
    deposit: true,
    price: 200,
    km: 13.5,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2000'
  },
  {
    address,
    deposit: false,
    price: 180,
    km: 9.9,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 2,
    date: '22/09/2000'
  },
  {
    address,
    deposit: true,
    price: 300,
    km: 26.6,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 3,
    date: '22/09/2000'
  },
  {
    address,
    deposit: false,
    price: 150,
    km: 12.4,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2000'
  },
  {
    address,
    deposit: true,
    price: 200,
    km: 13.5,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 1,
    date: '22/09/2000'
  },
  {
    address,
    deposit: false,
    price: 180,
    km: 9.9,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 2,
    date: '22/09/2000'
  },
  {
    address,
    deposit: true,
    price: 300,
    km: 26.6,
    startTime: '08:56',
    endTime: '08:56',
    idClient: 3,
    date: '22/09/2000'
  }
]
