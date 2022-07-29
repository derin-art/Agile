import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import LogoHollow from "../public/logoHollow";
import Logo from "../public/logo";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex p-2 text-white bg-indigo-800 shadow-md border-green-300 border-b items-center">
      {Logo("fill-green-200", "30", "30")}
      <p className="text-green-300 mt-1 text-xl font-Josefin"> BUOYANT</p>
      <div className="ml-2 hidden">
        <Link href="/">Home</Link>
        <Link href="/NewPage">Newpage</Link>
      </div>
    </div>
  );
}
