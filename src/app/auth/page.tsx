import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LoginCard } from "@/modules/auth/ui/login-sheet";
import { SignUpCard } from "@/modules/auth/ui/sign-up-sheet";
import { ArrowLeftIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <main className="flex h-screen w-full p-3">
      <div className="hidden w-1/2 rounded-xl bg-gradient-to-t from-[#1c1a27] via-[#e7627d] to-[#dbdcd7] lg:block"></div>
      <div className="flex w-1/2 flex-col items-center justify-center gap-6">
        <LoginCard />
        <SignUpCard />
        <Button size="lg" className="w-[8rem] text-xl" asChild variant="link">
          <Link href="/">
            <ArrowLeftIcon />
            Home
          </Link>
        </Button>
      </div>
    </main>
  );
};
export default LoginPage;
