import './global.css'
import { Routes, Route } from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster"

import AuthLayout from './_auth/AuthLayout'
import { SigninForm, SignupForm, ResetPassword, ResetPasswordConfirm, GitHub, Google, VerifyAccounut} from './_auth'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'

import Chat from './_auth/chats/Chat'

const App = () => {

  return (
    <main className='flex h-screen'>
        <Routes>
            {/* private routes*/}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm />} />
                <Route path='/sign-up' element={<SignupForm />} />
                <Route path="/google" element={<Google />} />
                <Route path="/github" element={<GitHub />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                <Route path="/activate/:uid/:token" element={<VerifyAccounut />} />

                <Route path='/chat' element={<Chat />} />
            </Route>

            {/* public routes*/}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App