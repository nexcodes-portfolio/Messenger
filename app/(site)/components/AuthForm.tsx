"use client";

import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/inputs/Button";
import AuthSocialButton from "./AuthSocialButton";
// typescript interfaces and types
type Variant = "LOGIN" | "REGISTER"; // union type of strings (variant can only be LOGIN or REGISTER) | it will be used for useState hook of variant and setVariant

const AuthForm = () => {
  // declare state variables
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    try {
      setIsLoading(true);
      // if variant is REGISTER, then register the user
      if (variant === "REGISTER") {
        // register user
      }

      // if variant is LOGIN, then login the user
      if (variant === "LOGIN") {
        // nextAuth Sign in
      }

      const socialAction = (action: string) => {
        setIsLoading(true);
      };
    } catch (error) {
      console.error(error);
    }
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
            />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <div>
                <Button 
                    disabled={isLoading}
                    fullWidth
                    type="submit"
                >
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
            </div>

            <div className="mt-6 flex gap-2">
                <AuthSocialButton />
            </div>
      </div>
    </div>
  );
};

export default AuthForm;
