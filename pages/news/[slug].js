import groq from "groq";
import client from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const query = groq`
  { 
    "post": *[_type == 'post' && slug.current == '${slug}'][0]{
        ...,
        'author': author->name
    },
    "navbar": *[_type == 'navbar'] | order(order asc),
    "footer": *[_type == 'footer'] | order(order asc),
    
  }  
  `;

  const data = await client.fetch(query);

  return {
    // revalidate: 60 * 60 * 24,
    props: {
      post: data.post,
      navbar: data.navbar,
      footer: data.footer,
    },
  };
}

export default function SinglePost({ post, navbar, footer }) {
  const router = useRouter();

  // console.log(post);
  // console.log(navbar);

  if (router.isFallback) {
    return <h1>Loading....</h1>;
  }

  if (!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-screen-2xl mx-auto bg-white min-h-screen">
        <div className="px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 py-4">
            {post.title}
          </h1>
          <div className="flex space-x-5 text-sm text-gray-500">
            <span className="text-blue-500 block pb-4">{post.author}</span>
            <span>{new Date(post.publishedAt).toDateString()}</span>
          </div>
          <Image width={900} height={1000} src={urlFor(post.mainImage).url()} />
          <div className="prose max-w-2xl">
            <BlockContent blocks={post.body} />
          </div>
        </div>
      </div>
    </div>
  );
}
