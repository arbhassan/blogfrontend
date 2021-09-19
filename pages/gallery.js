import Head from "next/head";
import client from "../client";
import groq from "groq";
import { useAppContext } from "./_app";
import React, { useEffect, useState } from "react";

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

function Gallery() {
  return (
    <div>
      <Head>
        <title>Gallery | RM of Willowdale No. 153</title>
      </Head>
      Gallery
    </div>
  );
}

export default Gallery;
