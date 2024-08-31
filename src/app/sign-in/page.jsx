import SignInForm from '@/components/auth/SignInForm';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';

const SignInPage = () => {

    return (
        <div className="px-2 min-h-[85vh] max-w-lg w-full mx-auto flex items-center justify-center ">
            
        <div className="w-full">
          <Logo textSize="1.8rem" />
            
<div className="bg-secondary shadow-lg p-5 rounded-lg mt-5 ">
            <p className="text-xl font-medium mb-5 text-center ">
              Log in to Qwik Chat
            </p>

          <div>
            <SignInForm />

            <div className="mt-4 text-center text-sm text-gray-600 ">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline font-medium hover:text-primary duration-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

            </div>

        
      </div>
    );
}
export default SignInPage;