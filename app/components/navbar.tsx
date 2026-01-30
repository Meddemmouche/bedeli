import { auth } from '@/lib/auth';
import NavbarClient from './navbarClient';

export default async function Navbar() {
  const session = await auth();
  
  return <NavbarClient session={session} />;
}