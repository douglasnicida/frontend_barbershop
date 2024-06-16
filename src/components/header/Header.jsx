import "./style.css";

import { AiOutlineUser } from "react-icons/ai";
import { Avatar, AvatarGroup, Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { BsScissors } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyMenuItem({children, onClick}) {
    return (
        <MenuItem _hover={{bg:'var(--purple-hover)', textColor: 'white'}} gap={2} paddingY={3} onClick={onClick}>
            {children}
        </MenuItem>
    )
}

function LoginModal({setIsLogged}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = useRef(null)

    async function handleLogin(e){
        e.preventDefault();

        let login = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;

        const body = {
            "login": login,
            "password": password
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/login',body)
            localStorage.setItem("token", response.data.token)
            setIsLogged(true);
            toast.success("Logado com sucesso!");
            onClose();
        } catch (e) {
            setIsLogged(false)
            toast.error("Houve algum problema ao tentar fazer o login, tente novamente.");
            console.log(e)
        }

    }
  
    return (
      <>
        <MyMenuItem onClick={onOpen}> Login </MyMenuItem>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Entre na sua conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input id="login-email" ref={initialRef} placeholder='Digite seu e-mail' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Senha</FormLabel>
                <Input id="login-password" type="password" placeholder='Digite sua senha' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme='purple' ml={3} onClick={handleLogin}>
                Entrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

function SignUpModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)

    async function handleSignUp(){
        const name = document.getElementById('signup-name').value;
        const login = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirmPassword').value;

        if(!name || !login || !password){
            toast.error('Há informações obrigatórias não preenchidas')
            return;
        }

        if(password !== confirmPassword){
            toast.warn('As senhas não estão iguais.')
            return;
        }

        const body = {
            "nome": name,
            "login": login,
            "password": password,
            "role": "USER"
        }

        try {
            await axios.post('http://localhost:8080/auth/register',body);
            toast.success('Cadastro realizado com sucesso!')
            onClose();
        } catch(e) {
            toast.error('Erro inesperado ocorreu durante o processo de cadastro. Por favor tente novamente.')
            console.log(e)
        }
    }

    return (
        <>
        <MyMenuItem onClick={onOpen}> Cadastro </MyMenuItem>

        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Crie sua conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Nome*</FormLabel>
                <Input id='signup-name' ref={initialRef} placeholder='Digite seu nome' />
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>E-mail*</FormLabel>
                <Input id='signup-email' placeholder='Digite seu e-mail' />
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Senha*</FormLabel>
                <Input id='signup-password' type="password" placeholder='Digite sua senha' />
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Confirme sua senha*</FormLabel>
                <Input id='signup-confirmPassword' type="password" placeholder='Confirme sua senha' />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>Cancelar</Button>
                <Button colorScheme='purple' ml={3} onClick={handleSignUp}>
                Criar conta
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            setIsLogged(!isLogged);
        } else {
            setIsLogged(false)
        }
    }, [])

  return (
    <div className="headerContainer">
      <a href="/" className="logo">YOURBARBER</a>

      <Menu>
        <MenuButton>
            <AvatarGroup spacing="1rem" fill={'var(--white-container)'} borderColor={'var(--white-container)'} className="user-icon">
                <Avatar
                bg="transparent"
                width={39}
                height={39}
                icon={<AiOutlineUser fontSize="1.9rem" fill=""/>}
                className="user-icon-content"
                />
            </AvatarGroup>
        </MenuButton>
            {
                (isLogged) ?
                <MenuList>
                    <MyMenuItem>
                        <LiaUserEditSolid size={20} />
                        Editar perfil
                    </MyMenuItem>
                    <a href="/meus_agendamentos">
                        <MyMenuItem>
                            <IoCalendarOutline size={20}/>
                            Meus agendamentos
                        </MyMenuItem>
                    </a>
                    <a href="/minhas_barbearias">
                        <MyMenuItem>
                            <BsScissors size={20} />
                            Minhas barbearias
                        </MyMenuItem>
                    </a>
                    <MyMenuItem onClick={()=>{localStorage.removeItem("token"); setIsLogged(false); toast.success("Desconectado com sucesso!"); navigate('/')}}>
                        <PiSignOut size={20} />
                        Sair
                    </MyMenuItem>
                </MenuList>
                :
                <MenuList>
                    <LoginModal setIsLogged={setIsLogged} />
                    <SignUpModal />
                </MenuList>
            }
          
        
      </Menu>

      
    </div>
  );
}
