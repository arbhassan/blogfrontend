import client from "../client";
import groq from "groq";

export async function getStaticProps() {
  const query = groq`
  {
    "posts": *[_type == 'post'],
    "home": *[_type == 'homepage']
  }
  `;

  const data = await client.fetch(query);

  return {
    props: {
      posts: data.posts,
      home: data.home[0],
    },
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home({ posts, home }) {
  console.log(posts);
  console.log(home);
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            {home.title}
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            {home.description}
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post) => (
            <div key={post.title}>
              <div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
                  Walt Whitman
                </span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">{post.description}</p>
              <div className="mt-6 flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
