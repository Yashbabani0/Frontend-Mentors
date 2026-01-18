import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen mx-auto">
      <SignIn />
    </div>
  );
}
