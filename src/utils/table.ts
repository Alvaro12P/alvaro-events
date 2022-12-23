import { GridSelectionModel } from '@mui/x-data-grid'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'
export interface Data {
  id: number
  name: string
  address: string
  phone: string
  date: string
  startTime: string
  endTime: string
  deposit: boolean
  price: number
  km: number
}

export interface Column {
  id: 'id' | 'name' | 'address' | 'phone' | 'price' | 'deposit' | 'date' | 'km'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
  numeric: boolean
  disablePadding: boolean
  sortable?: boolean
}
interface handleDeleteRowProps {
  rows: Data[]
  setRows: React.Dispatch<React.SetStateAction<Data[]>>
  setSelected:
    | React.Dispatch<React.SetStateAction<readonly number[]>>
    | React.Dispatch<React.SetStateAction<GridSelectionModel>>
  selected: readonly number[] | GridSelectionModel
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey
}

export const handleDeleteRow = ({
  rows,
  setRows,
  setSelected,
  enqueueSnackbar,
  selected
}: handleDeleteRowProps) => {
  const newRows = rows.filter((r) => !selected.includes(r.id))
  const rowsToDelete = rows.filter((r) => selected.includes(r.id))
  rowsToDelete.forEach(async (r) => {
    await fetch(`/api/events/${r.id}`, { method: 'DELETE' })
  })
  setRows(newRows)
  setSelected([])
  enqueueSnackbar(
    `Se ha${rowsToDelete.length > 1 ? 'n' : ''} eliminado ${
      rowsToDelete.length
    } evento${rowsToDelete.length > 1 ? 's' : ''}`,
    {
      variant: 'success'
    }
  )
}
