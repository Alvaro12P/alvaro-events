import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'next-auth/react'

interface UserMenuProps {
  avatar: string
  username: string
}

export default function UserMenu({ avatar, username }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  return (
    <>
      <Tooltip title="Opciones">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar className="w-14 h-14" src={avatar} alt={username} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        id="user-menu"
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}
