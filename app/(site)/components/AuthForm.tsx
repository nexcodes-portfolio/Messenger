"use client";

import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// typescript interfaces and types
type Variant = "LOGIN" | "REGISTER"; // union type of strings (variant can only be LOGIN or REGISTER) | it will be used for useState hook of variant and setVariant

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  // declare state variables
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect to check if authenticated or not

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  // change variant from LOGIN to REGISTER and vice versa
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, [variant]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // if variant is REGISTER, then register the user
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data)
        })
        .catch(() => {
          toast.error("Something went wrong!");
          console.log("AuthForm register 1");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // if variant is LOGIN, then login the user
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
            console.log("AuthForm register 2");
            console.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Signed In Successfully");
            router.push("/users");
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
          console.log("AuthForm register 3");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: true,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Login Failed");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Signed In Successfully");
        }
      })
      .catch(() => {
        toast.error("Something went wrong!");
        console.log("AuthForm register 4");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              Icon={BsGithub}
              onClick={() => socialAction("github")}
            />

            <AuthSocialButton
              Icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
