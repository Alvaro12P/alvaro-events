import TableWrapper from '../components/table/TableWrapper'
import ClientsContextProvider from '../context/ClientsContext'

export default function Home() {
  return (
    <ClientsContextProvider>
      <TableWrapper />
    </ClientsContextProvider>
  )
}
