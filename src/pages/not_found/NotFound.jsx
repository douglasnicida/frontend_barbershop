import ContentContainer from "../../components/contentContainer/ContentContainer"
import HeadingContainer from "../../components/heading/Heading"

export default function NotFound() {
    const breadcrumbItems = [
        {
            page: 'Not Found',
            url: '/',
            isCurrent: true
        },
      ]

    return (
        <>
        <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Not Found 404'}>
        </HeadingContainer>

        <ContentContainer>
        </ContentContainer>
        </>
    )
}