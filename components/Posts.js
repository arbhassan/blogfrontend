import Link from "next/link";

export default function Posts({ posts, navbar }) {
  if (posts == 0) {
    return (
      <div>
        <p>No posts found. Please add some posts to the blog</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:pl-14">
      {posts &&
        posts.map((post) => (
          <div
            key={post.slug.current}
            className="border-b-2 border-gray-200 pb-6 pt-6"
          >
            <span className="text-gray-400 text-sm font-bold pb-4 block">
              {post.categories}
            </span>
            <Link href={`/news/${post.slug.current}`}>
              <a className="text-gray-600 hover:text-gray-900 transition-colors duration-500">
                <h2 className="text-2xl  font-bold tracking-tighter pb-4 md:text-4xl">
                  {post.title}
                </h2>
              </a>
            </Link>
            <span className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toDateString()}
            </span>
          </div>
        ))}
    </div>
  );
}
