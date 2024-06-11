import { Container } from "@chakra-ui/react";

export default function ContentContainer({children}) {
    return(
        <Container className='home-content-container'>
            <Container maxW={'6xl'} className='home-content'>
                {children}
            </Container>
        </Container>

    )
}