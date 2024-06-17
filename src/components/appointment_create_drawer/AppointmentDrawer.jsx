import './style.css'

import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, Stack, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import axiosInstance from '../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function AppointmentDrawer({service}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    const { id } = useParams();

    const [chosenDate, setChosenDate] = useState(null)

    function handleDateTimeChange(e) {
      setChosenDate(new Date())
      const result = e.target.value.toString()

      const inputYear = document.getElementById('selectedAppointmentYear')
      const inputMonth = document.getElementById('selectedAppointmentMonth')
      const inputDay = document.getElementById('selectedAppointmentDay')
      
      const inputHour = document.getElementById('selectedAppointmentHour')
      const inputMinutes = document.getElementById('selectedAppointmentMinutes')

      let splitChosenDate = result.split('T')

      let date = splitChosenDate[0].split('-')
      let time = splitChosenDate[1].split(':')

      let day = date[2]
      let month = date[1]
      let year = date[0]

      let hour = time[0]
      let minutes = time[1]

      inputYear.value = year
      inputMonth.value = month
      inputDay.value = day

      inputHour.value = hour
      inputMinutes.value = minutes

      setChosenDate(`${year}-${month}-${day}T${hour}:${minutes}:00`);
    }

    async function handleSubmit() {
      let user = 0;
      const barbershop_id = (+id);
      const dateTime = chosenDate;
    
      try {
        user = await axiosInstance.get('/usuario/minha_conta');
      } catch(e) {
          toast.error('Erro inesperado ao tentar criar barbearia.')
          console.log(e)
      }
      
      if(!user || !barbershop_id || !dateTime || !service?.id){
        toast.error('Há campos obrigatórios não preenchidos.')
      }

      const body = {
        "id": "",
        "data": dateTime,
        "usuario_id": user.data,
        "servico_id": service?.id,
        "barbearia_id": barbershop_id
      }

      try {
        await axiosInstance.post('/agendamento/', body);
        toast.success(`${service?.nome} agendado com sucesso!`)
        onClose();
      } catch(e) {
        toast.error('Erro inesperado ao tentar criar agendamento.')
        console.log(e)
      }
    }

    return (
      <>
        <Button
          className='drawer-button'
          variant="solid"
          rightIcon={<IoIosArrowForward />}
          onClick={onOpen}
        >Agendar</Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
          className='appointment-drawer'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' className='appointment-drawer'>
              Agendar {service?.name}
            </DrawerHeader>
  
            <DrawerBody className='appointment-drawer'>
              <Stack spacing='24px'>
                <Box>
                <FormLabel htmlFor='appointment_datetime'>Selecione uma data e hora</FormLabel>
                 <Input 
                 id='appointment_datetime' className='appointment-input'
                 placeholder='Select Date and Time' 
                 size='md' 
                 type='datetime-local'
                 onChange={handleDateTimeChange}
                 />
                </Box>
                <Divider />
                <Box>
                  <InputGroup className='date-container'>
                    <div className="box boxDay">
                      <FormLabel>Dia</FormLabel>
                      <Input id='selectedAppointmentDay' className='appointment-input'/>
                    </div>

                    <div className="box boxMonth">
                      <FormLabel>Mês</FormLabel>
                      <Input id='selectedAppointmentMonth' className='appointment-input'/>
                    </div>

                    <div className="box boxYear">
                      <FormLabel>Ano</FormLabel>
                      <Input id='selectedAppointmentYear' className='appointment-input' contentEditable={false}/>
                    </div>
                  </InputGroup>

                  <InputGroup className='time-container'>
                    <div className="box">
                      <FormLabel>Hora</FormLabel>
                      <Input id='selectedAppointmentHour' className='appointment-input'/>
                    </div>
                    <div className="box">
                      <FormLabel>Minuto</FormLabel>
                      <Input id='selectedAppointmentMinutes' className='appointment-input'/>
                    </div>
                  </InputGroup>
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px' className='appointment-drawer'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button className='appointment-submit-button' onClick={handleSubmit}>Agendar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

