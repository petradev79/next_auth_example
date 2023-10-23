import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ChakraButton from '@/components/ChakraButton';

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect('/signin');
  }
  return (
    <div className='container'>
      <h1>HOME PAGE</h1> <ChakraButton />
    </div>
  );
};
export default Home;
