import Link from 'next/link'

import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>
          Chaining Multiple Middleware Functions
        </h1>
        <pre className='mt-4'>
          <code>{JSON.stringify({ name: user?.name }, null, 2)}</code>
        </pre>

        <Link
          href='/api/auth/signout'
          className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Sign Out
        </Link>
      </div>
    </section>
  )
}
