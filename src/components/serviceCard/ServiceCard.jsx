import { IoIosArrowForward } from 'react-icons/io';
import './style.css'
import { Button, Card, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';

export default function ServiceCard() {
    return (
        <Card className='service-card' maxW={'sm'}>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              className='service-card-image'
            />
            <Stack mt="6" spacing="3" paddingX={5}>
                
              <Heading size="sm" className='card-service-label'>Serviço</Heading>
              <Heading size="md">Nome serviço</Heading>
              <Text className='card-service-details'>Descrição Serviço</Text>
            </Stack>
    
          <CardFooter>
            <div className="card-footer-container">
              <Button
                variant="solid"
                backgroundColor={"var(--purple)"}
                _hover={{ bgColor: "var(--purple-hover)" }}
                textColor={"white"}
                width={250}
                rightIcon={<IoIosArrowForward />}
              >
                Agendar
              </Button>
            </div>
          </CardFooter>
        </Card>
      );
}