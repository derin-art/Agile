import { useRouter } from "next/dist/client/router";

export default function id() {
  const postFunction = async () => {
    try {
      const res = await fetch("/api/handler", {
        method: "POST",
        body: JSON.stringify({ name: "hey", Age: 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();
  console.log(router.query.id);
  return (
    <div>
      PPPP
      {router.query.id}
      <button
        onClick={() => {
          postFunction();
        }}
      >
        Hey
      </button>
    </div>
  );
}
