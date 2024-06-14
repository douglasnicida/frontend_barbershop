import { useNavigate, useParams } from 'react-router-dom';
import HeadingContainer from '../../components/heading/Heading'
import './style.css'
import ContentContainer from '../../components/contentContainer/ContentContainer';
import { Heading, SimpleGrid, Text } from '@chakra-ui/react';
import ServiceCard from '../../components/serviceCard/ServiceCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
const seeMoreText = 'Ver mais >>'


export default function BarbershopDetails(){
    const [barbershop, setBarbershop] = useState(null);
    const [services, setServices] = useState(null);
    const { id } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
      async function getBarbershop() {
        let result = []
  
        try {
          result = await axiosInstance.get(`/barbearias/${id}`);
          setBarbershop(result.data);

          result = await axiosInstance.get(`/barbearia/${id}/servicos`);
          setServices(result.data)
        } catch(e) {
          navigate('/not_found')
        }
      }
  
      getBarbershop()
    }, [])

    const breadcrumbItems = [
      {
        page: 'Home',
        url: '/',
        isCurrent: false
      },

      {
          page: barbershop?.nomeBarbearia,
          url: `/barbearia/${id}`,
          isCurrent: true
      }
    ]

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={barbershop?.nomeBarbearia}>
            <h6 className='heading-details-address'>{barbershop?.endereco}</h6>
        </HeadingContainer>

        <ContentContainer>
            <Heading className='service-card-service-title'>Serviços</Heading>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(270px, 1fr))'>

                {
                    (services?.length > 0) ?
                    services.map(service => {
                        return (
                            <ServiceCard key={service} service={service}/>
                        )
                    })
                    :
                    <Text>Esta barbearia ainda não possui serviços cadastrados.</Text>
                }
                
            </SimpleGrid>
            <a href="#" className='service-card-see-more'>{seeMoreText}</a>
            
            
            <div className="barbershop-about-section">
                <Heading className='about-title'>Sobre</Heading>
                <Text className='about-text'>
                    Descrição/Sobre/informações adicionais da barbearia
                </Text>
                <span className='about-owner-name'>Nome dono</span>
            </div>
        </ContentContainer>
        </>
    )
}