import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import HeadingContainer from '../../components/heading/Heading';
import './style.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';

function AppointmentCancelButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Cancelar
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Cancelamento de Agendamento
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Confirmar cancelamento do agendamento?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Voltar
                </Button>
                <Button colorScheme='red' onClick={onClose} ml={3}>
                  Sim
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}

function AppointmentConcludedButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        Concluído
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Conclusão de Agendamento
            </AlertDialogHeader>

            <AlertDialogBody>
              Confirmar que o serviço do agendamento foi concluído?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Voltar
              </Button>
              <Button colorScheme='green' onClick={onClose} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function AppointmentItem() {
    return (
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        >
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='Caffe Latte'
        />

        <Stack className='appointment-card-box'>
            <CardBody className='appointment-card-info'>
                <Box>
                    <Heading size='lg'>Nome Serviço</Heading>
                    <Text py='2'>
                        Nome Cliente
                    </Text>
                </Box>

                <Box className='appointment-card-datetime'>
                    <Box className='appointment-card-date'>
                        <span>Data:</span><Text>00/00/0000</Text>
                    </Box>

                    <Box className='appointment-card-time'>
                        <span>Hora:</span><Text>00:00</Text>
                    </Box>

                    <Tag marginTop={2} className='service-card-price'>R$20,00</Tag>
                </Box>

                
            </CardBody>

            <CardFooter className='appointment-card-footer'>
                <AppointmentCancelButton />
                <AppointmentConcludedButton />
            </CardFooter>
        </Stack>
        </Card>
    )
}

export default function BarberAppointmentList() {
    const [barbershop, setBarbershop] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    const breadcrumbItems = [
        {
          page: 'Home',
          url: '/',
          isCurrent: false
        },

        {
            page: 'Minhas Barbearias',
            url: `/minhas_barbearias`,
            isCurrent: false
        },

        {
            page: 'Barbearia',
            url: `/barbearia`,
            isCurrent: true
        },
      ]

      async function handleFindBarbershop() {
        try {
            await axiosInstance.get(`/barbearias/${id}`).then(result => {setBarbershop(result.data); console.log(result.data)})
        } catch(e) {
            console.log(e);
        }
      }
    
      useEffect(() => {
        handleFindBarbershop()
      }, [])

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={`Agendamentos ${barbershop?.nomeBarbearia}`}>
          <Button colorScheme='purple' marginTop={2} onClick={() => {navigate(`/minhas_barbearias/barbearia/${id}/edit`)}}>Editar barbearia</Button>
        </HeadingContainer>
        <ContentContainer>
            <div className="appointment-list">
                <AppointmentItem />
                <AppointmentItem />
                <AppointmentItem />
            </div>
        </ContentContainer>
        </>
    )
}