import './style.css';

import { AiOutlineUser } from 'react-icons/ai';
import { Avatar, AvatarGroup } from '@chakra-ui/react'

export default function Header() {
    return (
        <div className="headerContainer">
            <h1 className='logo'>YOURBARBER</h1>
            <AvatarGroup spacing='1rem' className='user-icon'>
                <Avatar bg='transparent' icon={<AiOutlineUser fontSize='2.3rem' />} className='user-icon-content' />
            </AvatarGroup>
        </div>
    )
}