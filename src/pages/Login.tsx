import Hero from "@/components/common/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import axios from "axios";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters long"
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // try {
    //   const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
    //     values
    //   });
    //   console.log(res.data);
    //   alert("Registered successfully!");
    // } catch (err) {
    //   console.error(err);
    //   alert("Registration failed");
    // }
    console.log(values)
  }


  return(
    <main className="flex flex-col justify-center items-center h-screen p-8">
      <Hero />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[350px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="player123" 
                    className="w-full p-6 border border-black md:text-base"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Minimum of 8 characters" 
                    type="password"
                    className="w-full p-6 border border-black md:text-base"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
   
          <Button type="submit" className="mt-4 p-6 cursor-pointer font-inter-medium">Log in</Button>  
        </form>
      </Form>
      <Link to={"/register"} className="text-center">
        <Button className="p-6 cursor-pointer font-inter-regular" variant={"link"}>I don't have an account yet</Button>  
      </Link>
    </main>
  )
}