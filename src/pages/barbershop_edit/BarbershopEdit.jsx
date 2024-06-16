import { Box, Button, FormControl, FormLabel, Heading, Input, SimpleGrid, Skeleton, Stack, Text, Tooltip } from "@chakra-ui/react";
import ContentContainer from "../../components/contentContainer/ContentContainer";
import HeadingContainer from "../../components/heading/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import ServiceDrawer from "../../components/service_drawer/ServiceDrawer";

import './style.css'
import { toast } from "react-toastify";



export default function UserBarbershopEdit() {
  const { id }  = useParams();

  const navigate = useNavigate();

  const [barbershop, setBarbershop] = useState(null);
  const [isLoadingService, setIsLoadingService] = useState(true);
  const [services, setServices] = useState([]);

  const nameInput = document.getElementById('edit-barbershop-name');
  const addressInput = document.getElementById('edit-barbershop-address');    

  const breadcrumbItems = [
    {
      page: "Home",
      url: "/",
      isCurrent: false,
    },

    {
      page: "Minhas barbearias",
      url: "/minhas_barbearias",
      isCurrent: false,
    },

    {
        page: barbershop?.nomeBarbearia,
        url: `/minhas_barbearias/barbearia/${id}`,
        isCurrent: false,
    },

    {
        page: `Editar ${barbershop?.nomeBarbearia}`,
        url: `/minhas_barbearias/barbearia/${id}/edit`,
        isCurrent: true,
    },
  ];

  async function handleFindBarbershop() {
    try {
        await axiosInstance.get(`/barbearia/${id}`).then(result => {
            const data = result.data;
            setBarbershop(data)
        })
        
    } catch(e) {
        console.log(e);
    }

    try {
        const serviceAtt = await axiosInstance.get(`/barbearia/${id}/servicos`)
        setServices(serviceAtt.data)
        setIsLoadingService(false);
    } catch(e) {
        console.log(e);
    }
  }

  async function handleUpdateBarbershop() {
    const newName = nameInput.value;
    const newAddress = addressInput.value;

    if(newName === '' || newAddress === ''){
      toast.error('Existem campos obrigatórios não preenchidos');
      return;
    }

    if (newName === barbershop?.nomeBarbearia && newAddress === barbershop?.endereco) {
      toast.warn('Nome e barbearia se mantiveram iguais.');
      setTimeout(navigate(`/minhas_barbearias/barbearia/${id}`), 2000);
      return;
    }
    

    const body = {
      "id": id,
      "nomeBarbearia": newName,
      "endereco": newAddress
    }

    try {
      await axiosInstance.put('/barbearia/', body);
      toast.success('Barbearia modificada com sucesso!');
      setTimeout(navigate(`/minhas_barbearias/barbearia/${id}`), 2000);
    } catch(e) {
      toast.error('Erro ao editar barbearia, tente novamente!');
      console.log(e);
    }
  }

// TODO: fazer requisição para editar barbearia
  useEffect(() => {
    handleFindBarbershop()
  }, [])

  useEffect(() => {
    if(barbershop) {
        nameInput.value = barbershop.nomeBarbearia
        addressInput.value = barbershop.endereco
    }
  }, [isLoadingService])

  return (
    <>
      <HeadingContainer
        breadcrumbItems={breadcrumbItems}
        title={`Editar ${barbershop?.nomeBarbearia}`}
      >
      </HeadingContainer>

      <ContentContainer>
        <FormControl>
          <FormLabel>Nome barbearia</FormLabel>
          <Input
            id="edit-barbershop-name"
            placeholder="Digite o novo nome da barbearia"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Endereço barbearia</FormLabel>
          <Input
            id="edit-barbershop-address"
            placeholder="Digite o novo endereço da barbearia"
          />
        </FormControl>

        <Tooltip label='Este botão consolidará apenas a ação de edição do nome e do endereço da barbearia. 
        As ações dos serviços já são consolidados logo após a ação!' padding={4} borderRadius={10}>
          <Button colorScheme='purple' marginTop={5} onClick={handleUpdateBarbershop}>Concluir edição</Button>
        </Tooltip>

        <Heading className='service-card-service-title' marginTop={10}>Serviços</Heading>
              {
                (isLoadingService) &&
                <Stack>
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                  <Skeleton height='20px' />
                </Stack>
              }

              {
                (!isLoadingService && services?.length > 0) &&
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(270px, 1fr))' marginTop={10}>
                    {services?.map(service => {
                        return (
                            <ServiceCard key={service} service={service} hasDeleteButton/>
                        )
                    })}
                </SimpleGrid>
              }
              {
                (!isLoadingService && services?.length === 0) &&
                <>
                    <Text textAlign={'center'}>Esta barbearia ainda não possui serviços cadastrados.</Text>
                </>
              }
            <Box marginTop={10}>
                <ServiceDrawer />
            </Box>
      </ContentContainer>
    </>
  );
}
