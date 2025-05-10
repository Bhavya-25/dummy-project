import InitialProfile from "@/components/InitialProfile/InitialProfile";
import Register from "@/components/SignupPage/Register";
import Varification from "@/components/VarificantionPage/Varification";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Register/>
    <Varification/>
    <InitialProfile/>
    
    </>
  );
}
