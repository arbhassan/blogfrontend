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

function Contact({ contact }) {
  let contacts = contact[0].contact;
  let officehours = contact[0].officehours;
  let persons = contact[0].personnel.name;
  return (
    <div>
      <Head>
        <title>Contact Info | RM of Willowdale No. 153</title>
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">
              Contact
            </h1>

            <div className="pb-20">
              <div className=" bg-white rounded-lg shadow">
                <ul className="divide-y-2 divide-gray-100 break-normal">
                  {contacts.map((item) => (
                    <li className="p-3 break-all " key={item.contact}>
                      {item}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">
              Office Hours
            </h1>
            <div className="pb-20">
              <div className=" bg-white rounded-lg shadow">
                <ul className="divide-y-2 divide-gray-100">
                  {officehours.map((item) => (
                    <li className="p-3">
                      {item}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Personnel
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {persons.map((item) => (
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={item._key}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src="https://dummyimage.com/80x80"
                  />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">{item.number}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
