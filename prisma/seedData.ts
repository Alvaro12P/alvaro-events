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

export const events: Prisma.EventUncheckedCreateInput[] = [
  {
    address: 'Calle 1',
    deposit: false,
    price: 150,
    km: 12.4,
    startTime: '2020-05-12T23:50:21.817Z',
    endTime: '2020-05-12T23:50:21.817Z',
    idClient: 1
  },
  {
    address: 'Calle 2',
    deposit: true,
    price: 200,
    km: 13.5,
    startTime: '2020-05-12T23:50:21.817Z',
    endTime: '2020-05-12T23:50:21.817Z',
    idClient: 1
  },
  {
    address: 'Calle 3',
    deposit: false,
    price: 180,
    km: 9.9,
    startTime: '2020-05-12T23:50:21.817Z',
    endTime: '2020-05-12T23:50:21.817Z',
    idClient: 2
  },
  {
    address: 'Calle 4',
    deposit: true,
    price: 300,
    km: 26.6,
    startTime: '2020-05-12T23:50:21.817Z',
    endTime: '2020-05-12T23:50:21.817Z',
    idClient: 3
  }
]
