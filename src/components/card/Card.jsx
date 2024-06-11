import { Button, Card, CardBody, CardFooter, Heading, Image, Stack } from "@chakra-ui/react";
import "./style.css";
import { IoIosArrowForward } from "react-icons/io";

export default function BarbershopCard() {
  return (
    <Card maxW="sm" backgroundColor={'white'}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Nome barbearia</Heading>
          <p className="barbershop-address">Endereço - Cidade, Estado</p>
        </Stack>
      </CardBody>
      <CardFooter>
        <div className="card-footer-container">
          <Button variant="solid" backgroundColor={'var(--purple)'} _hover={{bgColor: 'var(--purple-hover)'}} textColor={'white'} width={250} rightIcon={<IoIosArrowForward />}> 
            Acessar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
