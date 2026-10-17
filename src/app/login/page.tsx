import { redirect } from 'next/navigation'

// Public website currently presents the app prototype rather than account access.
export default function LoginPage() {
  redirect('/register')
}
