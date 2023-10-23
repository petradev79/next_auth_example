import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ChakraLogin from '@/components/ChakraLogin';

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <ChakraLogin />
    </div>
  );
};

export default SignIn;
