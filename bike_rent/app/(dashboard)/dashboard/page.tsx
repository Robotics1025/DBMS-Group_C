"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { totalmem } from "os";
import { title } from "process";
import { useState } from "react";


export default function Page() {
  const [BIKES,setBIKES]=useState("")

  const overview_data=[
    {title:"ALL BIKES",total:12},
    {title:"REMAINING BIKES",total:10},
    {title:"RENTED BIKES",total:2}
  ]
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to your dashboard!</p>
      <div className="flex flex-row justify-evenly gap-4 ">
        {
          overview_data.map(
            (data)=>{
              return(
                 <Card className="w-[400px] ">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
           
          <CardContent>
            <CardTitle>{data.total}</CardTitle>
          </CardContent>
        </Card>

              )
            }
          )
        }
             </div>
    </div>
  )
}