import './style.css'
import { Card, CardFooter, Heading, Image, Stack, Tag, Text } from '@chakra-ui/react';
import AppointmentDrawer from '../appointment_create_drawer/AppointmentDrawer';

export default function ServiceCard({appointment}) {
  console.log(appointment)
    return (
        <Card className='service-card' maxW={'sm'}>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              className='service-card-image'
            />
            <Stack mt="6" spacing="3" paddingX={5}>
                
              <Heading size="sm" className='card-service-label'>Serviço</Heading>
              <Heading size="md">{appointment.nome}</Heading>
              <Text className='card-service-details'>{appointment.descricao}</Text>

              <Tag className='service-card-price'>R${appointment.preco},00</Tag>
            </Stack>
    
          <CardFooter>
            <div className="card-footer-container">
              <AppointmentDrawer />
            </div>
          </CardFooter>
        </Card>
      );
}