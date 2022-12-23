import AddIcon from '@mui/icons-material/AddCircleRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import LocationIcon from '@mui/icons-material/LocationOn'
import {
  Checkbox,
  darken,
  IconButton,
  lighten,
  Paper,
  Tooltip,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridSelectionModel
} from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import React, { useContext } from 'react'
import { DateTime } from 'ts-luxon'
import { ClientsContext } from '../../context/ClientsContext'
import useToggle from '../../hooks/useToggle'
import { EventsTools } from '../../utils/events'
import { handleDeleteRow } from '../../utils/table'
import FormModal from '../forms/FormModal'

const getBackgroundColor = (color: string, mode: 'dark' | 'light') =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5)

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6)

export default function Table() {
  const { rows, setRows } = useContext(ClientsContext)
  const { enqueueSnackbar } = useSnackbar()
  const [selected, setSelected] = React.useState<GridSelectionModel>([])
  const [modalOpen, toggleModal] = useToggle()

  // eslint-disable-next-line @typescript-eslint/ban-types
  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  const handleDeposit = debounce(async function (id: number, deposit: boolean) {
    const r = await EventsTools.update(id, { deposit })
    if (!r.error) {
      const newRows = rows.map((r) => (r.id === id ? { ...r, deposit } : r))
      setRows(newRows)
      enqueueSnackbar('Fianza actualizada correctamente', {
        variant: 'success'
      })
    } else enqueueSnackbar(r.message, { variant: 'error' })
  }, 500)

  const handleCellEdit: GridEventListener<'cellEditStop'> = (params) => {
    console.log({ params })
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      hideable: true,
      flex: 0.1,
      headerAlign: 'center',
      align: 'right'
    },
    {
      field: 'name',
      headerName: 'Nombre',
      editable: true,
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Contacto',
      editable: true,
      sortable: false,
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Dirección',
      editable: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ value }) => (
        <a
          target="_blank"
          href={value}
          rel="noopener noreferrer"
          aria-label="Google map URL"
        >
          <LocationIcon />
        </a>
      )
    },
    {
      field: 'price',
      headerName: 'Precio',
      editable: true,
      headerAlign: 'center',
      align: 'right',
      flex: 1,
      valueFormatter: ({ value }) => `${value}€`
    },
    {
      field: 'deposit',
      headerName: 'Fianza',
      editable: false,
      sortable: false,
      flex: 0.8,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => (
        <Checkbox
          checked={row.deposit}
          onChange={(_e, checked) => handleDeposit(row.id, checked)}
          aria-labelledby="deposit"
        />
      )
    },
    {
      field: 'date',
      headerName: 'Fecha',
      editable: true,
      flex: 1
    },
    {
      field: 'startTime',
      headerName: 'Hora inicio',
      editable: true,
      flex: 1
    },
    {
      field: 'endTime',
      headerName: 'Hora fin',
      editable: true,
      flex: 1
    },
    {
      field: 'km',
      headerName: 'KMs',
      editable: true,
      flex: 1
    }
  ]

  return (
    <Paper sx={{ width: '100%' }}>
      <Box className="p-4 w-full rounded-none flex items-center justify-center">
        <Typography variant="h4" component="h3" className="flex-1">
          Eventos {DateTime.now().toFormat('yyyy')}
        </Typography>
        <div className="gap-2 flex">
          {selected.length > 0 && (
            <Tooltip title="Eliminar" arrow>
              <IconButton
                onClick={() =>
                  handleDeleteRow({
                    rows,
                    setRows,
                    selected,
                    setSelected,
                    enqueueSnackbar
                  })
                }
              >
                <DeleteIcon className="h-8 w-8" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Añadir" arrow>
            <IconButton onClick={toggleModal}>
              <AddIcon className="h-8 w-8" />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 631,
          '& .passed-date': {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.error.main, theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                )
            }
          },
          '& .current-date': {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.info.main, theme.palette.mode),
            '&:hover': {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.info.main,
                  theme.palette.mode
                )
            }
          },
          '& .deposit': {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
            '&:hover': {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                )
            }
          },
          '& .no-deposit': {
            bgcolor: (theme) => theme.palette.background.paper,
            '&::hover': {
              bgcolor: (theme) =>
                getBackgroundColor(
                  theme.palette.background.paper,
                  theme.palette.mode
                )
            }
          }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 25]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          getRowClassName={({ row }) => {
            const now = DateTime.now()
            const dateHour = DateTime.fromFormat(
              `${row.date} ${row.endTime}`,
              'dd/MM/yyyy hh:mm'
            )
            const date = DateTime.fromFormat(row.date, 'dd/MM/yyyy')
            console.log({ now, dateHour, date })

            if (dateHour.ts <= now.ts) return 'passed-date'
            else if (now.ts >= date.ts && now.ts <= dateHour.ts)
              return 'current-date'
            else if (row.deposit) return 'deposit'
            else return 'no-deposit'
          }}
          onCellEditStop={handleCellEdit}
          selectionModel={selected}
          onSelectionModelChange={(model) => setSelected(model)}
        />
      </Box>
      <FormModal open={modalOpen} onClose={toggleModal} />
    </Paper>
  )
}
