import { auth } from '@/lib/auth';

export default async function Profile(){
    const session = await auth();
    if (!session) {
        return (
            <div className='flex' >You are not logged in</div>
        )
    }
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-bold text-xl'> {session.user?.name}!</p>
      <div className='flex flex-col gap-2'>
        <span className='text-sm'>Your Email: {session.user?.email}</span>
        <button className='px-4 py-2 bg-red-500 text-white rounded-md w-fit mt-2' onClick={() => console.log("Edit clicked")}>Edit</button>
      </div>
      <div></div>
    </div>
  );
}