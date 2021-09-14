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

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = groq`
    *[_type == 'post' && slug.current == '${slug}'][0]{
        ...,
        'author': author->name
    }
    
  `;

  const data = await client.fetch(query);

  return {
    revalidate: 60 * 60 * 24,
    props: {
      post: data,
    },
  };
}

export default function SinglePost({ post }) {
  const router = useRouter();

  console.log(post);

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
      <div className="max-w-screen-2xl mx-auto bg-white min-h-screen">
        <div className="px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 py-4">
            {post.title}
          </h1>
          <div className="flex space-x-5 text-sm text-gray-500">
            <span className="text-blue-500 block pb-4">{post.author}</span>
            <span>{new Date(post._createdAt).toDateString()}</span>
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
