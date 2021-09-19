import Head from "next/head";

import client from "../client";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

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

    "documents": *[_type == 'documents']
    { 
      _id,
      title,
      "URL": document{asset->{path,url}
      
      },
    }

    
    
  }
  `;

  const data = await client.fetch(query);

  return {
    props: {
      posts: data.posts,
      home: data.home[0],
      footer: data.footer,
      navbar: data.navbar,
      documents: data.documents,
    },
  };
}

function Documents({ documents }) {
  let docs = documents;
  console.log(docs);
  return (
    <div>
      <Head>
        <title>Documents | RM of Willowdale No. 153</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">
              RM 153 Documents
            </h1>
            <div className="pb-20">
              <div className=" bg-white rounded-lg shadow">
                <ul className="divide-y-2 divide-gray-100">
                  {docs.map((item) => (
                    <a href={item.URL.asset.url} target="_blank" key={item._id}>
                      <li className="p-3">{item.title}</li>
                    </a>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Documents;
