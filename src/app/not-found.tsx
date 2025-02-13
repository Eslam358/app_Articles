import Link from 'next/link'



export default function NotFound() {

  return (
    <div className=' flex justify-center mt-32 items-center gap-3 flex-col'>
      <h2>Not Found</h2>
      <p>Could not find requested resource </p>
      <Link className='underline text-blue-400 hover:text-blue-500' href="/">Return Home</Link>
    </div>
  )
}