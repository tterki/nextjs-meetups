import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list of react meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// ** OPTION 1 : getStaticProps() (runs during the build process)
export async function getStaticProps() {
  // fetch from an API
  const uri =
    "mongodb+srv://tterki:ncVVaUTXHXgjnWYQ@cluster0.xwjatjb.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // le temps de rafraichissement des donnés
  };
}

export default HomePage;

// ** OPTION 2 : getServerSideProps() (always runs on the server after deployment)
// export async function getServerSideProps(context) {
//   const req = context.req; // request object, used for authentication (among others)
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
