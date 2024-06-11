import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, IconButton, Input, InputGroup, InputRightAddon, Select, SimpleGrid } from '@chakra-ui/react';
import './App.css';
import BarbershopCard from './components/card/Card';
import { IoMdSearch } from 'react-icons/io';
import { IoChevronForwardSharp } from 'react-icons/io5';

export default function App() {
  return (
    <>
      <Container maxW={'full'} height={120} marginBottom={90} backgroundColor={'white'} paddingY={5} paddingX={40}>
        <Breadcrumb spacing='8px' separator={<IoChevronForwardSharp color='gray.500' />} marginBottom={5}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading textColor={'var(--primary-text)'} marginBottom={3}>Barbearias</Heading>

        <InputGroup>
          <Input placeholder='Buscar' backgroundColor={'#F9F9F9'} maxW={'full'} height={50}/>
          <InputRightAddon paddingRight={-10} height={50}>
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
              backgroundColor={'var(--purple)'}
              _hover={{bg:'var(--purple-hover)'}}
              textColor={'white'}
              aria-label='Search database'
              icon={<IoMdSearch size={23} />}
              roundedBottomLeft={0}
              roundedTopLeft={0}
              width={130}
              height={'full'}
            />
          </InputRightAddon>
        </InputGroup>
      </Container>

      <Container maxW={'full'} backgroundColor={'var(--white-container)'}>
        <Container paddingY={30} maxW={'7xl'}>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
            <BarbershopCard />
          </SimpleGrid>
        </Container>

        
      </Container>
    </>
  );
}