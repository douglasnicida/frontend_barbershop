import './style.css'

import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"

export default function ServiceDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    function handleSubmit() {

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
                </Box>
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth='1px' className='appointment-drawer'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button className='appointment-submit-button'>Adicionar</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

