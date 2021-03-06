import client from "../client";
import groq from "groq";

export async function getStaticProps() {
  const query = groq`
  {
    "posts": *[_type == 'post']{...,
      'categories': categories[]->title,
      'authorName': author->name,
      'authorSlug': author-> slug,

    },
    "home": *[_type == 'homepage'],

    "navbar": *[_type == 'navbar'] | order(order asc),

    "footer": *[_type == 'footer'] | order(order asc),
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
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}
