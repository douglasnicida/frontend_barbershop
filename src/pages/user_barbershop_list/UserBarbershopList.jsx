import { useEffect, useRef, useState } from 'react';
import BarbershopCard from '../../components/barbershopCard/Card';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import HeadingContainer from '../../components/heading/Heading';
import './style.css';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Skeleton, Stack, useDisclosure } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosConfig';

function CreateBarbershopButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)

  async function handleCreatebarbershop(){
      const name = document.getElementById('create-barbershop-name').value;
      const address = document.getElementById('create-barbershop-address').value;
      let user = 0;
      

      try {
        user = await axiosInstance.get('/usuario/minha_conta');
      } catch(e) {
          toast.error('Erro inesperado ao tentar criar barbearia.')
      }


      if(!name || !address|| !user){
          toast.error('Há informações obrigatórias não preenchidas')
          return;
      }

      const body = {
        "nomeBarbearia": name,
        "endereco": address,
        "usuario_id": user.data
      }

      try {
          await axiosInstance.post('/barbearia/',body);
          toast.success(`Barbearia ${name} foi criada com sucesso!`);
          window.location.reload();
          onClose();
      } catch(e) {
          console.log(e)
      }
  }

  return (
      <>
      <Button colorScheme='purple' onClick={onOpen}>Criar barbearia</Button>

      <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
      >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crie sua barbearia</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Nome barbearia*</FormLabel>
                  <Input id='create-barbershop-name' ref={initialRef} placeholder='Digite o nome da barbearia' />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Endereço barbearia*</FormLabel>
                  <Input id='create-barbershop-address' placeholder='Digite endereço da barbearia' />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>Cancelar</Button>
                <Button colorScheme='purple' ml={3} onClick={handleCreatebarbershop}>
                  Criar barbearia
                </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
      </>
  )
}


export default function UserBarbershopList() {
  const [userBarbershops, setUserBarbershops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    {
        page: 'Home',
        url: '/',
        isCurrent: false
    },

    {
        page: 'Minhas barbearias',
        url: '/minhas_barbearias',
        isCurrent: true
    },
  ]
  async function getUserBarbershops() {
    let user = 0;
    let result = []

    try {
      user = await axiosInstance.get('/usuario/minha_conta');
    } catch(e) {
        toast.error('Erro inesperado ao tentar criar barbearia.')
    }

    try {
      setIsLoading(true);
      result = await axiosInstance.get(`/usuario/${user.data}/barbearias`);
      setUserBarbershops(result.data);
      setIsLoading(false);
    } catch(e) {
        toast.error('Erro inesperado ao tentar criar barbearia.')
    }
  }

  useEffect(() => {
    getUserBarbershops()
  }, [])

  return (
    <>
      <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Minhas barbearias'}>
      </HeadingContainer>

      <ContentContainer>
        {
          (isLoading) &&
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        }
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>

            {
              (userBarbershops && !isLoading) ?
              userBarbershops.map((barbershop) => {
                return (
                  (barbershop) &&
                  <BarbershopCard key={barbershop.id} from={'/minhas_barbearias'} barbershop={barbershop}/>
                )
              })
              :
              !userBarbershops &&
              <h1>Nenhuma barbearia cadastrada.</h1>
            }
          </SimpleGrid>

          <div className="create-barber-button-container">
            	<CreateBarbershopButton />
          </div>
      </ContentContainer>
    </>
  );
}