import Hero from "@/components/common/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";


export default function Login() {
  return(
    <main className="flex flex-col justify-center items-center h-screen p-8">
      <Hero />
      <div className="flex flex-col gap-2 w-full max-w-[350px]">
        <Input type="email" placeholder="Email" className="w-full p-6 border border-black md:text-base"/>
        <Input type="password" placeholder="Password" className="w-full p-6 border border-black md:text-base"/>
        <Button className="mt-4 p-6 cursor-pointer">Log in</Button>  
        <Link to={"/"} className="text-center">
          <Button className="p-6 cursor-pointer" variant={"link"}>I don't have an account yet</Button>  
        </Link>
      </div>
    </main>
  )
}