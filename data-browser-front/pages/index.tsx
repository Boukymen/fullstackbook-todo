import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MiniDrawer from "@/components/AppDrawer";
import DataBrowserFetchAll from "@/components/DataBrowserFetchAll";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Data Browser</title>
                <meta name="description" content="App Data Browser"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="">
                <MiniDrawer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="text-center" style={{color: "#ff6b6b"}}>Fetch All Data</h1>
                            </div>
                        </div>
                    </div>

                    <div className="container"
                         style={{
                             width: '97vw',
                             overflowX: 'scroll',
                             scrollbar: {
                                 width: '5px', '&::-webkit-scrollbar': {
                                     width: '6px',
                                 }
                             },

                             scrollbarWidth: 'thin'
                         }}
                    >
                        <div className="row">
                            <DataBrowserFetchAll/>
                        </div>
                    </div>

                </MiniDrawer>
            </main>
        </>
    )
}
