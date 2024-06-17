import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    MenuItem, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure 
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";
  import axiosInstance from "../../utils/axiosConfig";
  import { LiaUserEditSolid } from "react-icons/lia";
  
  function MyMenuItem({children, onClick}) {
      return (
          <MenuItem _hover={{bg:'var(--purple-hover)', textColor: 'white'}} gap={2} paddingY={3} onClick={onClick}>
              {children}
          </MenuItem>
      )
  }
  
  export default function UserEdit() {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const initialRef = useRef(null)
      const nameRef = useRef(null);
      
      const [user, setUser] = useState(null);
  
      async function handleEditProfile(){
          const name = nameRef.current.value;
          const password = document.getElementById('edit-user-password').value;
          const confirmPassword = document.getElementById('edit-user-confirmPassword').value;
          
          if(!user){
              toast.error('Há informações obrigatórias não preenchidas')
              return;
          }
  
          if(password !== confirmPassword){
              toast.warn('As senhas não estão iguais.')
              return;
          }
  
          const body = {
              "id": user?.id,
              "nome": (name.length > 0) ? name : user?.nome,
              "senha": (password.length > 0) ? password : user?.senha,
              "trocouSenha": (password.length > 0) ? true : false
          }
  
          try {
              await axiosInstance.put('/usuario/', body);
              toast.success('Perfil editado com sucesso!')
              onClose();
          } catch(e) {
              toast.error('Erro inesperado ocorreu durante o processo de edição do perfil. Por favor tente novamente.')
              console.log(e)
          }
      }
  
      async function getUser() {
          try {
              const response = await axiosInstance.get('/usuario/minha_conta');
              const userID = response.data;
              const userResponse = await axiosInstance.get(`/usuario/${userID}`);
              setUser(userResponse.data);
          } catch(e) {
              toast.error('Erro inesperado ao tentar editar perfil.')
              console.log(e);
          }
      }
  
      useEffect(() => {
          getUser();
      }, []);
  
      return (
          <>
          <MyMenuItem onClick={onOpen}>
              <LiaUserEditSolid size={20} />
              Editar perfil
          </MyMenuItem>
  
          <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
          >
              <ModalOverlay />
              <ModalContent>
              <ModalHeader>Editar perfil</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                  <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input id='edit-user-name' ref={nameRef} placeholder='Digite seu nome' />
                  </FormControl>
  
                  <FormControl mt={4}>
                  <FormLabel>Senha</FormLabel>
                  <Input id='edit-user-password' type="password" placeholder='Digite sua senha' />
                  </FormControl>
  
                  <FormControl mt={4}>
                  <FormLabel>Confirme sua senha</FormLabel>
                  <Input id='edit-user-confirmPassword' type="password" placeholder='Confirme sua senha' />
                  </FormControl>
              </ModalBody>
  
              <ModalFooter>
                  <Button onClick={onClose}>Cancelar</Button>
                  <Button colorScheme='purple' ml={3} onClick={handleEditProfile}>
                  Concluir
                  </Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          </>
      )
  }
  