import { RegisterForm } from './components/register-form'
import tubarao from '@/styles/tiburao.svg'

export default function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <img src={tubarao} alt="Shark Logo" className="w-20 h-20 mx-auto dark:invert" />
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}