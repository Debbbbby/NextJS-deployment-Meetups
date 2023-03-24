import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Explore amazing meetup events here!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// 1. Static Generation
export async function getStaticProps() {
  // fetch data from an api
  const client = await MongoClient.connect(
    "mongodb+srv://debtsaiyi:hozWH8dsmUBJW90l@nextjs-meetup.oqf3vx1.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsData = await meetupsCollection.find().toArray();
  const meetups = meetupsData.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
  }));
  client.close();

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 1,
  };
}

// 2. Server Side Rendering
// export async function getServerSideProps(context) {
//   // to work with incoming request
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
