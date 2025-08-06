"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"






import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "@/Firebase/client"
import { signIn ,signUp} from "@/lib/action/auth.action";


const authFormSchema=(type:FormType)=>{
  return z.object({
    name:type==='sign-up'?z.string().min(3):z.string().optional(),
    email:z.string().email(),
    password:z.string().min(3),
  })
}


const AuthForm = ({type}:{type:FormType}) => {
  const router=useRouter();
  const formSchema=authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type==='sign-up'){
        const{name,email,password}=values;

        const userCredentials=await createUserWithEmailAndPassword(auth,email,password);

        const result=await signUp({
          uid:userCredentials.user.uid,
          name:name!,
          email,
          password,
        })
        if(!result?.success){
          toast.error(result?.message);
          return;
        }
        toast.success('Account created successfully. Please Sign in.');
        router.push('/sign-in')
      }else{
        const{email,password}=values;
        const userCredential=await signInWithEmailAndPassword(auth,email,password);

        const idToken=await userCredential.user.getIdToken();

        if(!idToken){
          toast.error('signin failed');
          return;
        }

        await signIn({
          email,idToken
        })
        toast.success('Sign in successfull');
        router.push('/')
      }
    } catch(error){
      console.log(error);
      toast.error(`There was an error:${error}`)
    }
  }


  const isSignIn=type==='sign-in';

  return (
    <div className="card-border lg:min-w-[566px]"> 
    <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h2 className="text-primary-100">Interview Prep</h2>
        </div>
        <h3>Practise Job Interview With Ai</h3>
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
      {!isSignIn && (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Your email address" type="email" {...field} />
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
              <Input placeholder="Enter Your Password" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="btn" type="submit" >{isSignIn?'Sign in':'Create an account'}</Button>
    </form>
  </Form>
  <p className="text-center">
    {isSignIn?'No Account yet':'Have an Account Already'}
    <Link href={!isSignIn?'/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1">
    {!isSignIn ? "sign in":"sign up"}
    </Link>
  </p>
</div>
</div>
  )
}


export default AuthForm