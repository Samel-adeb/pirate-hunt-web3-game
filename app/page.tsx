

import { redirect } from "next/navigation";


export default function Home() {
  redirect("/gameload");
  
  return null; 
}
