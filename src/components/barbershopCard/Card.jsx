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

  const imgFallback = "https://lh3.googleusercontent.com/proxy/0xBM0IzhQ1y6K59xf8W-Ft3j6KDgOuirePxWTxMX7tNWCa1OHq-8S--WNmMTN_sfNObgxa9f70V0NO7OegMkjyIaJy-phN_7SOob6QgCPaZyEEtJMKcIyK0z0yonZZm534AyKd6d0o9rFDXSDq4_yrmmsw"

  return (
    <Card maxW="sm" backgroundColor={"white"}>
      <CardBody>
        <Image
          src={(barbershop?.imagem) ? barbershop?.imagem : imgFallback}
          objectFit={"cover"}
          objectPosition={"center"}
          borderRadius="lg"
          width={"full"}
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
