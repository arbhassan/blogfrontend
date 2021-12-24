import Head from "next/head";
import client from "../client";
import groq from "groq";

import BlockContent from "@sanity/block-content-to-react";

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

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
    "page": *[_type == 'page' && slug.current == "${pageSlug}"]{...,
      content[]{
        ..., 
        asset->{
          ...,
          "_key": _id
        }
      }}[0...5]

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
      page: data.page,
    },
  };
};

export default function Page({ page }) {
  console.log(page[0].title);
  return (
    <div>
      <Head>
        <title>{page[0].title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="max-w-screen-2xl mx-auto bg-white min-h-screen">
          <div className="px-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 py-4">
              {page[0].title}
            </h1>
            <div className="prose max-w-2xl">
              <BlockContent blocks={page[0].content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}