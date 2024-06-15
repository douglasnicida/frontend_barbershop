import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import "./style.css";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BarbershopCard({from, barbershop}) {
  const [id, setId] = useState(-1);

  useEffect(() => {
    if(!barbershop?.id) {
      const separatedLink= barbershop?._links.self.href.split('/')
      const len = separatedLink?.length - 1
  
      setId(separatedLink[len])
    } else {
      setId(barbershop.id)
    }
  },[])


  if(!from) {
    from = "";
  }
  
  const navigate = useNavigate();

  function handleCardClick() {
    if(localStorage.getItem('token')){
      navigate(`${from}/barbearia/${id}`)
    } else {
      toast.warn("Necessário estar logado para ter acesso às outras páginas.")
    }
  }

  return (
    <Card maxW="sm" backgroundColor={"white"}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{barbershop.nomeBarbearia}</Heading>
          <p className="barbershop-address">{barbershop.endereco}</p>
        </Stack>
      </CardBody>

      <CardFooter>
        <div className="card-footer-container">
          <Button
            variant="solid"
            backgroundColor={"var(--purple)"}
            _hover={{ bgColor: "var(--purple-hover)" }}
            textColor={"white"}
            width={250}
            rightIcon={<IoIosArrowForward />}
            onClick={handleCardClick}
          >
            Acessar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
