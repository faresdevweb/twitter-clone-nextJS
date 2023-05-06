import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { UserProvider } from '@/context/User context/UserContext'
import { TweetProvider } from '@/context/Tweet context/TweetContext'
import Layout from '@/components/Layout'


export default function App({ Component, pageProps }) {

  const router = useRouter();

  const isLoginPage = router.pathname === "/"

  return (
    <UserProvider>
      <TweetProvider>
        <Layout isLoginPage={isLoginPage}>
          <Component {...pageProps} />
        </Layout>
      </TweetProvider>
    </UserProvider>
  )
}
