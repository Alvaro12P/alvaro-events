import { Client, Prisma } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import { Data } from '../utils/table'

interface ClientsContextInterface {
  clients: Client[]
  setClients: Dispatch<SetStateAction<Client[]>>
  rows: Data[]
  setRows: Dispatch<SetStateAction<Data[]>>
  loading: boolean
}

export const ClientsContext = React.createContext<ClientsContextInterface>({
  clients: [],
  setClients: () => {
    return
  },
  rows: [],
  setRows: () => {
    return
  },
  loading: true
})

type ClientWithEvents = Prisma.ClientGetPayload<{ include: { events: true } }>

export default function ClientsContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [clients, setClients] = React.useState<Client[]>([])
  const [rows, setRows] = React.useState<Data[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useMemo(async () => {
    setLoading(true)
    const clients: Client[] = await fetch('/api/clients/all').then((r) =>
      r.json()
    )
    const clientsWithEvents: ClientWithEvents[] = await fetch(
      '/api/clients/all?events=true'
    ).then((r) => r.json())
    setClients(clients)

    const rows: Data[] = []
    for (const c of clientsWithEvents) {
      for (const e of c.events) {
        rows.push({
          ...e,
          name: c.name,
          phone: c.phone
        })
      }
    }

    setRows(rows)
    setLoading(false)
  }, [])

  return (
    <ClientsContext.Provider
      value={{ clients, setClients, rows, setRows, loading }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
