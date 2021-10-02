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
    },
    "folder": *[_type == 'folder'] | order(title){
        ...,
        "relatedDocuments": *[_type=='documents' && references(^._id)]{ _id,
          title,
          "URL": document{asset->{path,url} }
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
      folder: data.folder,
    },
  };
}

function Documents({ folder }) {
  return (
    <div>
      <Head>
        <title>Documents | RM of Willowdale No. 153</title>
      </Head>

      <div>
        {folder.map((item) => (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-2 mx-auto">
              <div className="flex flex-col text-center w-full mb-0 ">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-xlg font-bold text-gray-900">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </h1>
                <div className="pb-10">
                  <div className=" bg-white rounded-lg shadow">
                    <ul className="divide-y-2 divide-gray-100">
                      {item.relatedDocuments.map((step) => (
                        <a
                          href={step.URL.asset.url}
                          target="_blank"
                          rel="noreferrer"
                          key={step._id}
                        >
                          <li className="p-3">{step.title}</li>
                        </a>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Documents;
