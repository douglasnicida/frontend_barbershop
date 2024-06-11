import { IconButton, Input, InputGroup, InputRightAddon, Select, SimpleGrid } from '@chakra-ui/react';
import './App.css';
import BarbershopCard from './components/barbershopCard/Card';
import { IoMdSearch } from 'react-icons/io';
import HeadingContainer from './components/heading/Heading';
import ContentContainer from './components/contentContainer/ContentContainer';

export default function App() {
  const breadcrumbItems = [
    {
      page: 'Home',
      url: '/',
      isCurrent: true
    }
  ]

  return (
    <>
      <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Barbearias'}>
        <InputGroup>
          <Input placeholder='Buscar' className='heading-search-input'/>
          <InputRightAddon className='heading-search-input-right-buttons'>
            <Select variant='filled' placeholder='Cidade'>
              <option value='option1'>Rio Claro</option>
              <option value='option1'>Piracicaba</option>
              <option value='option1'>Campinas</option>
            </Select>
            
            <Select variant='filled' placeholder='Serviço'>
              <option value='option1'>Corte masculino</option>
              <option value='option1'>Corte feminino</option>
              <option value='option1'>Barba</option>
              <option value='option1'>Tingir cabelo</option>
            </Select>
            <IconButton
              aria-label='Buscar barbearias'
              icon={<IoMdSearch size={23} />}
              className='heading-search-icon'
            />
          </InputRightAddon>
        </InputGroup>
      </HeadingContainer>

      <ContentContainer>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
          </SimpleGrid>
      </ContentContainer>
    </>
  );
}