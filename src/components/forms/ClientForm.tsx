import PhoneIcon from '@mui/icons-material/LocalPhoneRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { VariantType } from 'notistack'
import { useContext } from 'react'
import { object, string } from 'yup'
import { ClientsContext } from '../../context/ClientsContext'

interface ClientFormProps {
  sendNotification: (message: string, variant: VariantType) => void
}

const clientSchema = object({
  name: string()
    .required('El nombre es necesario')
    .min(5, 'El nombre debe contener al menos 5 carácteres')
    .matches(/^[a-z\s]{5,}$/i, {
      message: 'El nombre no puede contener carácteres especiales'
    }),
  phone: string()
    .required('El número de teléfono es necesario')
    .matches(/^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/, {
      message: 'Número de teléfono inválido'
    })
})

export default function Clientform({ sendNotification }: ClientFormProps) {
  const { clients, setClients } = useContext(ClientsContext)
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: clientSchema,
    onSubmit: async (values) => {
      fetch('/api/clients', {
        method: 'POST',
        body: JSON.stringify(values)
      })
        .then((r) => {
          if (r.status === 200) return r.json()
          else throw new Error(r.statusText)
        })
        .then((c) => {
          setClients([c, ...clients])
          formik.resetForm()
          sendNotification(
            `Cliente ${values.name} añadido correctamente`,
            'success'
          )
        })
        .catch((e) => sendNotification(e.message, 'error'))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex gap-4 flex-col">
      <TextField
        id="name"
        name="name"
        label="Nombre"
        variant="outlined"
        type="text"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonIcon />
            </InputAdornment>
          )
        }}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="phone"
        name="phone"
        label="Móvil"
        variant="outlined"
        type="tel"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PhoneIcon />
            </InputAdornment>
          )
        }}
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <Button variant="outlined" type="submit">
        Añadir cliente
      </Button>
    </form>
  )
}
