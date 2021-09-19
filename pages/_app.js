import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

import client from "../client";
import groq from "groq";

export async function getServerSideProps() {
  const query = groq`
   "footer": *[_type == 'footer'],
   "navbar": *[_type == 'navbar']
      
  `;

  const data = await client.fetch(query);

  return {
    props: {
      data: data,
      footer: data.footer,
      navbar: data.navbar,
    },
  };
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout footer={pageProps.footer} navbar={pageProps.navbar}>
      <Component
        footer={pageProps.footer}
        navbar={pageProps.navbar}
        {...pageProps}
      />
    </Layout>
  );
}
