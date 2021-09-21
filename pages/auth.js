import Head from "next/head";

import client from "../client";
import groq from "groq";

export async function getServerSideProps() {
  const query = groq`
  {
    "posts": *[_type == 'post']{...,
      'categories': categories[]->title,
      'authorName': author->name,
      'authorSlug': author-> slug,

    },
    "home": *[_type == 'homepage'],

    "navbar": *[_type == 'navbar'],

    "footer": *[_type == 'footer'],
    "contact": *[_type == 'contact'],

  }
  `;

  const data = await client.fetch(query);

  return {
    props: {
      posts: data.posts,
      home: data.home[0],
      footer: data.footer,
      navbar: data.navbar,
      contact: data.contact,
    },
  };
}

function Auth() {
  return (
    <div>
      <Head>
        <title>Contact Info | RM of Willowdale No. 153</title>
      </Head>
    </div>
  );
}

export default Auth;
