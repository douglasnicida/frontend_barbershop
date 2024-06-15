import './style.css'

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosConfig'
import { toast } from 'react-toastify'

export default function ServiceDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    const { id } = useParams();

    async function handleSubmit() {
        const name = document.getElementById('create-service-name');
        const description = document.getElementById('create-service-description');
        const price = document.getElementById('create-service-price');
        const time = document.getElementById('create-service-time');

        if(name.value === '' || description.value === '' || price.value === '' || time.value === ''){
          if(time.value === '') { time.focus();}
          if(price.value === '') { price.focus();}
          if(description.value === '') {description.focus();}
          if(name.value === '') {; name.focus();}
          toast.warn('Preencha todos os campos obrigatórios(*).');
        } else {
          const body = {
            "nome": name.value,
            "preco": price.value,
            "tempoServicoMinutos": price.value,
            "descricao": description.value,
            "barbearia_id": id
          }
  
          try {
            await axiosInstance.post('/servico/', body)
            toast.success('Serviço criado com sucesso!')
            onClose();
            setTimeout(()=>{window.location.reload()}, 2000);
          } catch(e) {
            console.log(e)
            toast.error('Erro ao criar o serviço');
          }
        }

    }

    return (
      <>
        <Button
          className='drawer-button'
          variant="solid"
          rightIcon={<IoIosArrowForward />}
          onClick={onOpen}
        >Adicionar serviço</Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
          className='appointment-drawer'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' className='appointment-drawer'>
              Adicionar Serviço
            </DrawerHeader>
  
            <DrawerBody className='appointment-drawer'>
              <Stack spacing='24px'>
                <Box>
                  {/* FORMS */}
                  <FormControl mt={4}>
                    <FormLabel>Nome serviço*</FormLabel>
                    <Input
                      id="create-service-name"
                      placeholder="Digite o nome do serviço"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Descrição serviço*</FormLabel>
                    <Textarea
                    id='create-service-description'
                    placeholder='Digite a descrição do serviço'
                    size='sm'
                    resize={'none'}
                  />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Preço serviço*</FormLabel>
                    <Input
                      id="create-service-price"
                      placeholder="Ex: 15.50"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Tempo estimado do serviço*</FormLabel>
                    <Input
                      id="create-service-time"
                      placeholder="Ex: 30 (valor em minutos)"
                    />
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px' className='appointment-drawer'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button className='create-service-submit-button' onClick={handleSubmit}>Adicionar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

