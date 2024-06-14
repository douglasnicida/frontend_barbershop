import { Box, FormControl, FormLabel, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import ContentContainer from "../../components/contentContainer/ContentContainer";
import HeadingContainer from "../../components/heading/Heading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import ServiceDrawer from "../../components/service_drawer/ServiceDrawer";

import './style.css'



export default function UserBarbershopEdit() {
  const { id }  = useParams();

  const [barbershop, setBarbershop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        let service = []
        setIsLoading(true);
        await axiosInstance.get(`/barbearias/${id}`).then(result => {
            const data = result.data;
            setBarbershop(data)
        })
        setIsLoading(false);
        
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
      ></HeadingContainer>

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

            {
                (!isLoadingService && services?.length > 0) ?
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(270px, 1fr))' marginTop={10}>
                    {services?.map(service => {
                        return (
                            <ServiceCard key={service} service={service} hasDeleteButton/>
                        )
                    })}
                </SimpleGrid>
                :
                <>
                    <Heading className='service-card-service-title' marginTop={10}>Serviços</Heading>
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
