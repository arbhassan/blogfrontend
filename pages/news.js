import Head from "next/head";
import client from "../client";
import groq from "groq";
import Hero from "../components/Hero";
import Posts from "../components/Posts";

export async function getServerSideProps() {
  const query = groq`
  {
    "posts": *[_type == 'post'] | order(publishedAt desc){...,
      'categories': categories[]->title,
      'authorName': author->name,
      'authorSlug': author-> slug,

    },
    "home": *[_type == 'homepage'],

    "navbar": *[_type == 'navbar'] | order(order asc),

    "footer": *[_type == 'footer'] | order(order asc),
  }
  `;

  const data = await client.fetch(query);

  return {
    props: {
      posts: data.posts,
      home: data.home[0],
      footer: data.footer,
      navbar: data.navbar,
    },
  };
}

export default function Home({ posts, home, navbar }) {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>Blog | RM of Willowdale No. 153</title>
      </Head>
      <div className="max-w-screen-2xl mx-auto bg-white">
        <Hero home={home} />
        <div className="px-6 md:flex md:pt-20">
          <div className="md:w-96 md:text-center">
            <h2 className="my-10 text-gray-900 font-bold text-2xl">
              Municipal News
            </h2>
          </div>
          <Posts posts={posts} navbar={navbar} />
        </div>
      </div>
    </div>
  );
}
