import "./style.css";

import { AiOutlineUser } from "react-icons/ai";
import { Avatar, AvatarGroup, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { BsScissors } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";

function MyMenuItem({children}) {
    return (
        <MenuItem _hover={{bg:'var(--purple-hover)', textColor: 'white'}} gap={2} paddingY={3}>
            {children}
        </MenuItem>
    )
}

export default function Header() {
    const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="headerContainer">
      <h1 className="logo">YOURBARBER</h1>

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
                    <MyMenuItem>
                        <IoCalendarOutline size={20}/>
                        Meus agendamentos
                    </MyMenuItem>
                    <MyMenuItem>
                        <BsScissors size={20} />
                        Minhas barbearias
                    </MyMenuItem>
                    <MyMenuItem>
                        <PiSignOut size={20} />
                        Sair
                    </MyMenuItem>
                </MenuList>
                :
                <MenuList>
                    <MyMenuItem> Login/Cadastro </MyMenuItem>
                </MenuList>
            }
          
        
      </Menu>

      
    </div>
  );
}
