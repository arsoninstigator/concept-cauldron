import { GetStaticPaths, GetStaticProps } from "next";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Profile({ user }: { user: any }) {
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);

  const paths = usersSnapshot.docs.map((doc) => ({
    params: { username: doc.data().username },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username as string;
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);

  const userDoc = usersSnapshot.docs.find((doc) => doc.data().username === username);

  if (!userDoc) return { notFound: true };

  return {
    props: { user: userDoc.data() },
    revalidate: 10, 
  };
};
