import { useParams } from 'react-router-dom';
import HeadingContainer from '../../components/heading/Heading'
import './style.css'
import ContentContainer from '../../components/contentContainer/ContentContainer';
import { Heading, SimpleGrid, Text } from '@chakra-ui/react';
import ServiceCard from '../../components/serviceCard/ServiceCard';
const seeMoreText = 'Ver mais >>'


export default function BarbershopDetails(){
    const { id } = useParams();
    const barbershopName = 'Barbearia ' + id;
    const breadcrumbItems = [
        {
          page: 'Home',
          url: '/',
          isCurrent: false
        },

        {
            page: barbershopName,
            url: `/barbearia/${id}`,
            isCurrent: true
        }
      ]

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={barbershopName}>
            <h6 className='heading-details-address'>Endereço - Cidade, Estado</h6>
        </HeadingContainer>

        <ContentContainer>
            <Heading className='service-card-service-title'>Serviços</Heading>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(270px, 1fr))'>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </SimpleGrid>
            <a href="#" className='service-card-see-more'>{seeMoreText}</a>
            
            
            <div className="barbershop-about-section">
                <Heading className='about-title'>Sobre</Heading>
                <Text className='about-text'>
                    Descrição/Sobre/informações adicionais da barbearia
                </Text>
                <span className='about-owner-name'>Tomas Turbando</span>
            </div>
        </ContentContainer>
        </>
    )
}