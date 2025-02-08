"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z.object({
  email: z.string().email().max(60, { message: "Email length not supported" }),
  name: z.string().max(60, { message: "Username length not supported" }),
  password: z
    .string()
    .min(8, { message: "Password length too short" })
    .max(50, { message: "Password length not supported" }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpValues) {
    startTransition(async () => {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    });
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button size="lg" className="w-[8rem] text-xl">
          Sign Up
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sign Up to loop</SheetTitle>
          <SheetDescription>
            By signin up you are accepting our terms and conditions.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Napolean"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      This will be your display name
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Napolean@bonaparte.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isPending}
                          {...field}
                          className="pe-9"
                          placeholder="Password"
                          type={isVisible ? "text" : "password"}
                        />
                        <button
                          disabled={isPending}
                          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label={
                            isVisible ? "Hide password" : "Show password"
                          }
                          aria-pressed={isVisible}
                          aria-controls="password"
                        >
                          {isVisible ? (
                            <EyeOff
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                data-loading={isPending}
                className="group relative disabled:opacity-100"
              >
                <span className="group-data-[loading=true]:text-transparent">
                  Submit
                </span>
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle
                      className="animate-spin"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
