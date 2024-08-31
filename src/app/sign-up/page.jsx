import Link from 'next/link';
import SignUpForm from '@/components/auth/SignUpForm';
import Logo from '@/components/ui/Logo';

const SignUpPage = () => {
    return (
        <div className="px-2 min-h-[100vh] pt-10 max-w-lg w-full mx-auto flex items-center justify-center pb-20">

<div className="w-full">
          <Logo textSize="1.8rem"  />


<div className="bg-secondary shadow-lg p-5 rounded-lg max-w-lg w-full mt-5 ">
            <div className="mb-5 text-center">
              <p className="text-xl font-medium mb-1  ">
                Create a new account
              </p>
              <p className="text-sm">It&apos;s quick and easy.</p>
            </div>

            <div>
              <SignUpForm />

              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline font-medium hover:text-primary duration-500">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
}
export default SignUpPage;