import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/interviewCard'
const Page = () => {
  return (
    <>
    <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
      <h2>
        Get Interview-Ready with Ai Powered Practise & Feedback
      </h2>
      <p className='text-lg'>
    Practise on Real Interview Questions & Get Instant Feedback
      </p>
      <Button asChild className='btn-primary max-sw:w-full'>
        <Link href="/interview">Start An Interview</Link>

      </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden"/>

    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>
      <div className='interviews-section'>
      {dummyInterviews.map((interview)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))}
      </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
    <h2>Take an Interview</h2>
    <div className='interviews-section'>
    {dummyInterviews.map((interview)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))}
      {/* <p>you haven&apos;t taken any interviews</p> */}
    </div>
    </section>
    </>
  )
}

export default Page