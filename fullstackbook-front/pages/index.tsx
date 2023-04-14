import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import ToDoList from '@/components/todo-list'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Full Stack Book To Do</title>
          <meta name="description" content="Full Stack Book To Do" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <ToDoList />
        </Layout>
      </div>
    </>
  )
}
