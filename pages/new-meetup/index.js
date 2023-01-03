// our-domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <head>
        <title>New meetup</title>
        <meta name="description" content="Add your own meetup"></meta>
      </head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;

// }
// async function addMeetupHandler(enteredMeetupData) {
//   const response = await fetch("/api/new-meetup", {
//     // car le serveur est le meme qui héberge la DB.
//     // /api/new-meetup => c'est le nom du fichier 'new-meetup.js' du dossier api
//     method: "POST",
//     body: JSON.stringify(enteredMeetupData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   router.push("/"); // pour retourner à l'acceuil (localhost:3000)

// export default NewMeetupPage;
