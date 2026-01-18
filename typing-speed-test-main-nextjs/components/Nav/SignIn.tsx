import { SignInButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div className="text-Neutral-0 border-2 border-Neutral-0 rounded-md px-6 py-1 cursor-pointer hover:opacity-80">
      <SignInButton />
    </div>
  );
}
