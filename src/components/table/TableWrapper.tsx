import { Paper } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useContext } from 'react'
import { ClientsContext } from '../../context/ClientsContext'
import Spinner from '../Spinner'
import Table from './Table'
export default function TableWrapper() {
  const { loading } = useContext(ClientsContext)

  return loading ? (
    <Paper
      sx={{ height: 720, width: 940 }}
      className="flex items-center justify-center"
    >
      <Spinner />
    </Paper>
  ) : (
    <SnackbarProvider>
      <Table />
    </SnackbarProvider>
  )
}
