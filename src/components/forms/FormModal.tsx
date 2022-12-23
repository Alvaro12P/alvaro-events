import { Box, Modal, Tab, Tabs } from '@mui/material'
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack'
import React from 'react'
import Clientform from './ClientForm'
import EventForm from './EventForm'

interface FormModalProps {
  open: boolean
  onClose: () => void
}

enum FormTabs {
  Client = 0,
  Event = 1
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function FormModalBody(props: FormModalProps) {
  const { open, onClose } = props
  const [currentTab, setCurrentTab] = React.useState(FormTabs.Client)
  const { enqueueSnackbar } = useSnackbar()

  const sendNotification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant })
  }

  const handleChangeTab = (_e: React.SyntheticEvent, value: number) =>
    setCurrentTab(value)
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-start justify-center pt-32 backdrop-blur-sm"
    >
      <Box sx={{ bgcolor: 'background.paper' }} className="w-96 p-4 rounded-xl">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            <Tab value={FormTabs.Client} label="Cliente" />
            <Tab value={FormTabs.Event} label="Evento" />
          </Tabs>
        </Box>
        <TabPanel value={currentTab} index={FormTabs.Client}>
          <Clientform sendNotification={sendNotification} />
        </TabPanel>
        <TabPanel value={currentTab} index={FormTabs.Event}>
          <EventForm />
        </TabPanel>
      </Box>
    </Modal>
  )
}

export default function FormModal(props: FormModalProps) {
  const { open, onClose } = props
  return (
    <SnackbarProvider>
      <FormModalBody open={open} onClose={onClose} />
    </SnackbarProvider>
  )
}
