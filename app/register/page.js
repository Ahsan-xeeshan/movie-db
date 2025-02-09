import RegistrationForm from "@/components/Auth/RegistrationForm";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-6">
            Create Your Account
          </h1>

          <RegistrationForm />

          <div className="mt-6 text-moviedb-gray">
            Already have an account?
            <Link href="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
