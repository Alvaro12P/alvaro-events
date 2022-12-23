import CarIcon from '@mui/icons-material/DirectionsCarRounded'
import EuroIcon from '@mui/icons-material/EuroSymbolRounded'
import MapIcon from '@mui/icons-material/MapRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useContext } from 'react'
import { DateTime } from 'ts-luxon'
import { boolean, date, number, object, string } from 'yup'
import { ClientsContext } from '../../context/ClientsContext'
import { EventsTools } from '../../utils/events'

const eventSchema = object({
  idClient: number().required('Es necesario seleccionar un cliente'),
  date: date().required('La fecha es necesaria'),
  price: number()
    .min(0, 'El precio mínimo es de 0€')
    .required('Es necesario introducir un precio'),
  address: string().matches(
    /^(https:\/\/)(goo.gl\/)(maps\/)[A-Za-z0-9]+$/i,
    'Formato de URL de GMaps incorrecto'
  ),
  startTime: date().required('La hora de inicio es necesaria'),
  endTime: date().required('La hora de fin es necesaria'),
  deposit: boolean(),
  km: number().min(0, 'El valor mínimo es de 0km')
})

export default function EventForm() {
  const theme = useTheme()
  const { clients, rows, setRows } = useContext(ClientsContext)
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      idClient: 1,
      address: '',
      price: 0,
      date: DateTime.now(),
      startTime: DateTime.now(),
      endTime: DateTime.now(),
      deposit: false,
      km: 0
    },
    validationSchema: eventSchema,
    onSubmit: async (values) => {
      const r = await EventsTools.create({
        ...values,
        date: values.date.toFormat('dd/MM/yyyy'),
        startTime: values.startTime.toFormat('HH:mm'),
        endTime: values.endTime.toFormat('HH:mm')
      })

      if (r.error) enqueueSnackbar(r.message, { variant: 'error' })
      else {
        const client = clients.find((c) => c.id === values.idClient)
        if (client) {
          setRows([
            {
              id: r.data.id,
              name: client.name,
              address: values.address,
              phone: client.phone,
              price: values.price,
              date: values.date.toFormat('dd/MM/yyyy'),
              startTime: values.startTime.toFormat('HH:mm'),
              endTime: values.endTime.toFormat('HH:mm'),
              deposit: values.deposit,
              km: values.km
            },
            ...rows
          ])
          formik.resetForm()
          enqueueSnackbar('Evento añadido satisfactoriamente', {
            variant: 'success'
          })
        } else
          enqueueSnackbar('No se ha podido encontrar el cliente especificado', {
            variant: 'error'
          })
      }
    }
  })

  return (
    <FormControl className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex gap-4 flex-col"
      >
        <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
        <Select
          value={formik.values.idClient}
          label="Cliente"
          id="idClient"
          name="idClient"
          endAdornment={
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          }
          onChange={formik.handleChange}
          error={formik.touched.idClient && Boolean(formik.errors.idClient)}
        >
          {clients.map((c) => (
            <MenuItem value={c.id} key={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id="address"
          name="address"
          label="Dirección (URL GMaps)"
          type="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MapIcon />
              </InputAdornment>
            )
          }}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          id="price"
          label="Precio"
          variant="outlined"
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EuroIcon />
              </InputAdornment>
            )
          }}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            renderInput={(props) => (
              <TextField
                label="Fecha"
                id="date"
                name="date"
                value={formik.values.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                {...props}
              />
            )}
            value={formik.values.date}
            onChange={(v) => formik.setFieldValue('date', v, true)}
          />

          <TimePicker
            renderInput={(params) => (
              <TextField
                id="startTime"
                name="startTime"
                label="Hora inicio"
                value={formik.values.startTime}
                error={
                  formik.touched.startTime && Boolean(formik.errors.startTime)
                }
                {...params}
              />
            )}
            value={formik.values.startTime}
            onChange={(v) => formik.setFieldValue('startTime', v, true)}
            ampm={false}
          />

          <TimePicker
            renderInput={(params) => (
              <TextField
                label="Hora fin"
                id="endTime"
                name="endTime"
                value={formik.values.endTime}
                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                {...params}
              />
            )}
            ampm={false}
            value={formik.values.endTime}
            onChange={(v) => formik.setFieldValue('endTime', v, true)}
          />
        </LocalizationProvider>

        <TextField
          id="km"
          label="KMs"
          variant="outlined"
          type={'number'}
          name="km"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CarIcon />
              </InputAdornment>
            )
          }}
          value={formik.values.km}
          onChange={formik.handleChange}
          error={formik.touched.km && Boolean(formik.errors.km)}
          helperText={formik.touched.km && formik.errors.km}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="deposit"
              name="deposit"
              value={formik.values.deposit}
              onChange={formik.handleChange}
            />
          }
          label={
            <Typography
              variant="body1"
              component="p"
              color={theme.palette.mode === 'dark' ? 'white' : 'black'}
            >
              Fianza
            </Typography>
          }
        />
        <Button variant="outlined" type="submit">
          Añadir evento
        </Button>
      </form>
    </FormControl>
  )
}
