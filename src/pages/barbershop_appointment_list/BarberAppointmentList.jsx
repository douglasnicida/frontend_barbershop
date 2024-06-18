import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardFooter, Heading, Image, Skeleton, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import HeadingContainer from '../../components/heading/Heading';
import './style.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function AppointmentCancelButton({appointmentID, isDisabled}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  async function handleDeleteAppointment() {
    try {
      await axiosInstance.delete(`/agendamento/${appointmentID}`);
      toast.success('Agendamento cancelado com sucesso!');
      onClose();
      setTimeout(window.location.reload(),2000)
    } catch (e){
      toast.error('Não foi possível cancelar este agendamento!');
    }
  }

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} isDisabled={isDisabled}>
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
              <Button colorScheme='red' onClick={handleDeleteAppointment} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function AppointmentItem({appointment}) {

    const [isConcluded, setIsConcluded] = useState(false);
    
    let unformattedDate = new Date(appointment?.data)
    let today = new Date();
    
    let dataAgendamento = 0;
    let timeAgendamento = 0;

    const data_string = new Date(appointment?.data).toUTCString();
      
    const dateAtt = new Date(data_string);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };
  
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(dateAtt);

    const data_split = formattedDate.split(', ');
    const data_att = data_split[0].split('/')
    const dia = data_att[0]
    const mes = data_att[1]
    const ano = data_att[2]
    
    const data_att2 = data_split[1].split(':')
    const hora = data_att2[0]
    const minutos = data_att2[1]
      
    
    dataAgendamento = `${dia}/${mes}/${ano}`;
    timeAgendamento = `${hora}:${minutos}`;

    today = today.getTime() - 10800000
    unformattedDate = unformattedDate.getTime()
    useEffect(() => {
      if(today > unformattedDate) {setIsConcluded(true);}
    }, [])

    


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
                    <Heading size='lg'>{appointment?.servico.nome}</Heading>
                    <Text py='2'>
                        {appointment?.usuario?.nome}
                    </Text>
                </Box>

                <Box className='appointment-card-datetime'>
                    <Box className='appointment-card-date'>
                        <span>Data:</span><Text>{dataAgendamento}</Text>
                    </Box>

                    <Box className='appointment-card-time'>
                        <span>Hora:</span><Text>{timeAgendamento}</Text>
                    </Box>

                    <Tag marginTop={2} className='service-card-price'>R$20,00</Tag>
                </Box>

                
            </CardBody>

            <CardFooter className='appointment-card-footer'>
                <AppointmentCancelButton appointmentID={appointment.id} isDisabled={isConcluded}/>
                {/* se passou a data e hora do agendamento, ele será marcado como concluído */}
                {isConcluded && <Button colorScheme='green' isDisabled>Concluído</Button>}
            </CardFooter>
        </Stack>
        </Card>
    )
}

function DeleteBarbershopButton({id}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const navigate = useNavigate();

  async function handleDeleteBarbershop() {
    try {
      await axiosInstance.delete(`/barbearia/${id}`)
      toast.success('Barbearia foi excluída com sucesso')
      setTimeout(() => {navigate('/minhas_barbearias')}, 2000)
      onClose();
    } catch(e) {
      toast.error('Falha ao tentar excluir a barbearia.');
    }
  }
    
    

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Deletar barbearia
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir barberia
            </AlertDialogHeader>

            <AlertDialogBody>
              Após a remoção não será possível recuperar a barbearia. Remover barbearia mesmo assim?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDeleteBarbershop} ml={3}>
                  Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default function BarberAppointmentList() {
    const [barbershop, setBarbershop] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            await axiosInstance.get(`/barbearias/${id}`).then(result => {setBarbershop(result.data);})
        } catch(e) {
            console.log(e);
        }
      }

      async function handleGetAppointments() {
        try {
          await axiosInstance.get(`/agendamento/barbearia/${id}`).then(result => {setAppointments(result.data);})
          setIsLoading(false);
        } catch(e) {
            console.log(e);
        }
      }
    
      useEffect(() => {
        handleFindBarbershop()
        handleGetAppointments()

      }, [])

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={`Agendamentos ${(barbershop?.nomeBarbearia) ? barbershop.nomeBarbearia : ''}`}>
          <Box display={'flex'} gap={2} alignItems={'center'} marginTop={5}>
            <Button colorScheme='purple' onClick={() => {navigate(`/minhas_barbearias/barbearia/${id}/edit`)}}>Editar barbearia</Button>
            <DeleteBarbershopButton id={id}/>
          </Box>
        </HeadingContainer>
        <ContentContainer>
            <div className="appointment-list">
            {
              (isLoading) &&
              <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
              </Stack>
            }


              {
                (!isLoading && appointments) &&
                appointments.map((appointment) => {
                  return (
                    (appointment) &&
                    <AppointmentItem key={appointment?.id} appointment={appointment}/>
                  )
                })
              }

                
            </div>
              {
                (!isLoading && appointments.length === 0) &&
                <h1>Nenhuma agendamento para mostrar</h1>
              }
        </ContentContainer>
        </>
    )
}