import { IoChevronForwardSharp } from 'react-icons/io5';
import './style.css';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading } from '@chakra-ui/react';

export default function HeadingContainer({children, title, breadcrumbItems}) {
    return (
        <Container className='heading-container'>
            <Breadcrumb spacing='8px' separator={<IoChevronForwardSharp color='gray.500' />} marginBottom={5}>
                {
                    breadcrumbItems.map((item) => {
                        return (
                            <BreadcrumbItem isCurrentPage={item.isCurrent} key={item.page}>
                                <BreadcrumbLink href={item.url}>
                                    {item.page}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    })
                }
            </Breadcrumb>
            <Heading className='heading-title'>{title}</Heading>

            {children}
        </Container>
    )
}