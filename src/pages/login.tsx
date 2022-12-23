import PersonIcon from '@mui/icons-material/PersonRounded'
import EyeIcon from '@mui/icons-material/Visibility'
import ClosedEyeIcon from '@mui/icons-material/VisibilityOff'
import KeyIcon from '@mui/icons-material/VpnKey'
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'yup'
import Spinner from '../components/Spinner'

const userSchema = object({
  username: string().required('Nombre de usuario es necesario'),
  password: string().required('Contraseña es necesaria ')
})

export default function Login() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      console.log({ values })
      const res = await signIn('credentials', {
        ...values,
        redirect: false
      })
      console.log(res)
    }
  })

  const { status } = useSession()
  const [visibility, setVisibility] = React.useState(false)

  if (status === 'loading') return <Spinner />
  else if (status === 'authenticated') router.push('/home')
  else
    return (
      <Paper className="h-auto flex p-8">
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            className="mb-4"
          >
            Iniciar Sesión
          </Typography>
          <TextField
            label="Usuario"
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Contraseña"
            type={visibility ? 'text' : 'password'}
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisibility((p) => !p)}>
                    {visibility ? <EyeIcon /> : <ClosedEyeIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button variant="outlined" type="submit" className="mt-4">
            INICIAR SESIÓN
          </Button>
        </form>
      </Paper>
    )
}
