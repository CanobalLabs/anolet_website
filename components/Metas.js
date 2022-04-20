/**
 * A component that contains the default meta tags for the website.
 */
export default function Metas()
{
    return (
      // Yo Rus hope you don't mind if I copy the meta tags from the coming soon page
      <>
        <title>Anolet</title>
        <meta name="title" content="Anolet - The Future of 2D" />
        <meta name="description" content="Anolet is an upcoming 2D gaming platform, where anyone will be able to create and play games with their avatar staying the same across them." />

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://anolet.com/"/>
        <meta property="og:title" content="Anolet - The Future of 2D"/>
        <meta property="og:description" content="Anolet is an upcoming 2D gaming platform, where anyone will be able to create and play games with their avatar staying the same across them." />
        <meta property="og:image" content="https://anolet.com/Banners/White/Large.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://anolet.com/" />
        <meta property="twitter:title" content="Anolet - The Future of 2D" />
        <meta property="twitter:description" content="Anolet is an upcoming 2D gaming platform, where anyone will be able to create and play games with their avatar staying the same across them." />
        <meta property="twitter:image" content="https://anolet.com/Banners/White/Large.png" />
        
        <link rel="icon" href="/favicon.ico" />
      </>
    );
}