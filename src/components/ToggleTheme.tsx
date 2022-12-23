import { useTheme } from '@mui/material/styles'
import React from 'react'
import { ColorModeCtx } from '../pages/_app'

export default function ToggleTheme({
  className = ''
}: {
  className?: string
}) {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeCtx)

  return colorMode === null ? (
    <></>
  ) : (
    <label className={`theme-switch ${className}`}>
      <input
        type="checkbox"
        onChange={colorMode.toggleColorMode}
        checked={theme.palette.mode === 'dark'}
      />
      <span className="theme-slider"></span>
    </label>
  )
}
