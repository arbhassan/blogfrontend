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
    paths: [
      "/news/complete-fire-ban-as-of-midnight-04nov2020",
      "/news/abandonment-of-poll-by-election",
      "/news/call-for-nomination-for-by-election",
      "/news/abandonment-of-poll",
      "/news/congratulations-to-paige-pranke",
      "/news/stray-animal-restrained",
      "/news/office-closure17-21aug2020",
      "/news/office-closure",
      "/news/stray-animal-restrained123",
      "/news/new-office-hours",
      "/news/office-closure1",
      "/news/office-closed-for-administrative-holidays-22-28th-of-july-2019",
      "/news/complete-fire-ban-has-been-lifted",
      "/news/fire-advisory-notice",
      "/news/the-rm-of-willowdale-no-153-would-like-to-congratulate-mr-richard-shellenberg-on-his-election-as",
      "/news/the-rm-of-willowdale-would-like-to-invite-ratepayers-to-take-part-in-this-free-webinar-series",
      "/news/internship",
      "/news/office-closure2131",
      "/news/insect-pest-surveys-in-crops",
      "/news/road-restrictions-being-removed",
      "/news/boundary-changes-updated",
      "/news/interactive-online-safety-training-program",
      "/news/rcmp-non-emergency-reporting-line",
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const query = groq`
  { 
    "post": *[_type == 'post' && slug.current == '${slug}'][0]{
        ...,
        'author': author->name
    },
    "navbar": *[_type == 'navbar'],
    "footer": *[_type == 'footer'],
    
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
