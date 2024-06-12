import BarbershopCard from '../../components/barbershopCard/Card';
import ContentContainer from '../../components/contentContainer/ContentContainer';
import HeadingContainer from '../../components/heading/Heading';
import './style.css';
import { SimpleGrid } from '@chakra-ui/react';

export default function UserBarbershopList() {
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

  return (
    <>
      <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Minhas barbearias'}>
      </HeadingContainer>

      <ContentContainer>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
            <BarbershopCard from={'/minhas_barbearias'}/>
            <BarbershopCard from={'/minhas_barbearias'}/>
            <BarbershopCard from={'/minhas_barbearias'}/>
          </SimpleGrid>
      </ContentContainer>
    </>
  );
}