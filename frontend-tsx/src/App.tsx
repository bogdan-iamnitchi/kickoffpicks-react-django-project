import './global.css'
import { Routes, Route } from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster"

import AuthLayout from './_auth/AuthLayout'
import { SigninForm, SignupForm, ResetPassword, ResetPasswordConfirm, GitHub, Google, VerifyAccounut} from './_auth'
import RootLayout from './_root/RootLayout'

import { Home, ChatAuth } from './_root/pages'
import { CreateUpdateRoom, JoinRoom, Room, RoomsHome } from './_rooms/pages'

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

            </Route>

            <Route element={<RootLayout />}>
                <Route path='/rooms-home' element={<RoomsHome />} />
                <Route path='/create-update-room' element={<CreateUpdateRoom />} />
                <Route path='/join-room' element={<JoinRoom />} />
                <Route path='/room/:code' element={<Room />} />
                
            </Route>

            {/* public routes*/}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='/chat' element={<ChatAuth />} />
            </Route>
        </Routes>

        <Toaster />
    </main>
  )
}

export default App