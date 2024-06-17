import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardFooter, Heading, Image, Skeleton, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import HeadingContainer from '../../components/heading/Heading';
import './style.css';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function AppointmentCancelButton({appointmentID}) {
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
    const nomeBarbeariaAgendamento = appointment?.barbearia.nomeBarbearia;
    const nomeServicoAgendamento = appointment?.servico.nome;
    const precoServicoAgendamento = appointment?.servico.preco;
    const imagemAgendamento = appointment?.servico.imagem;
    let dataAgendamento = 0;
    let timeAgendamento = 0;
    
    const data_string = new Date(appointment?.data).toUTCString();
    
    const date = new Date(data_string);

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
  
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

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

    return (
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        >
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={imagemAgendamento}
        />

        <Stack className='appointment-card-box'>
            <CardBody className='appointment-card-info'>
                <Box>
                    <Heading size='lg'>{nomeBarbeariaAgendamento}</Heading>
                    <Text py='2'>
                        {nomeServicoAgendamento}
                    </Text>
                </Box>

                <Box className='appointment-card-datetime'>
                    <Box className='appointment-card-date'>
                        <span>Data:</span><Text>{dataAgendamento}</Text>
                    </Box>

                    <Box className='appointment-card-time'>
                        <span>Hora:</span><Text>{timeAgendamento}</Text>
                    </Box>
                    <Tag marginTop={2} className='service-card-price'>R${precoServicoAgendamento}</Tag>
                </Box>
            </CardBody>

            <CardFooter className='appointment-card-footer'>
                <AppointmentCancelButton appointmentID={appointment?.id}/>
            </CardFooter>
        </Stack>
        </Card>
    )
}

export default function UserAppointmentList() {
    const [appointments, setAppointments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let user = -1;

    const breadcrumbItems = [
        {
          page: 'Home',
          url: '/',
          isCurrent: false
        },

        {
            page: 'Meus agendamentos',
            url: `/meus_agendamentos`,
            isCurrent: true
        }
      ]

      async function handleGetAppointments() {
        try{
          user = await axiosInstance.get('/usuario/minha_conta');
        } catch(e) {
          toast.error('Erro inesperado ao buscar seus agendamentos.')
          console.log(e);
        }

        try {
          axiosInstance.get(`/usuario/${user.data}/agendamentos`).then(result => setAppointments(result.data))
          setIsLoading(false);
        } catch(e) {
          toast.error('Não foi possível buscar seus agendamentos.')
          console.log(e);
        }
      }

      useEffect(() => {
        handleGetAppointments();
      }, [])

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Meus Agendamentos'}>
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
              (appointments && !isLoading) &&
              appointments.map((appointment) => {
                return (
                  (appointment) &&
                  <AppointmentItem key={appointment?.id} appointment={appointment} />
                )
              })
            }

            
                
            </div>
            {
              (!isLoading && appointments?.length === 0) &&
              <h1>Nenhum agendamento realizado.</h1>
            }
        </ContentContainer>
        </>
    )
}