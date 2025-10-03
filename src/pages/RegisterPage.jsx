import React, { useContext, useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/RegisterSchema";
import { registerUserAPI } from "../services/AuthService";
import { authContext } from "../contexts/AuthContext";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {isLoggedIn, setIsLoggedIn} = useContext(authContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "yousef",
      email: "hello@gmail.com",
      password: "Yousef@123",
      rePassword: "Yousef@123",
      gender: "male",
    },
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  async function registerUser(formData) {
    setIsLoading(true);
    const data = await registerUserAPI(formData);
    console.log(data);
    if (data.type === "error") {
      setErrorMessage(data.message);
      setSuccessMessage(null);
    } else {
      setSuccessMessage(data.message);
      setErrorMessage(null);
    }
    setIsLoading(false);
  }

  return (
    <div className="my-[50px] p-10 shadow-2xl rounded-xl">
      <h1 className="mb-5 text-center">Register Form</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(registerUser)}
      >
        <Input
          variant="bordered"
          label="Name"
          type="text"
          {...register("name")}
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
        />
        <Input 
          variant="bordered"
          label="Email"
          type="email"
          {...register("email")}
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        />
        <PasswordInput
          {...register("password")}
          {...register("password")}
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
        />
        <Input
          variant="bordered"
          label="Confirm Password"
          type="password"
          {...register("rePassword")}
          {...register("rePassword")}
          isInvalid={Boolean(errors.rePassword)}
          errorMessage={errors.rePassword?.message}
        />
        <Input
          className=""
          variant="bordered"
          label="Date of Birth"
          type="date"
          {...register("dateOfBirth")}
          isInvalid={Boolean(errors.dateOfBirth)}
          errorMessage={errors.dateOfBirth?.message}
        />
        <Select
          className=""
          label="Gender"
          variant="bordered"
          {...register("gender")}
          isInvalid={Boolean(errors.gender)}
          errorMessage={errors.gender?.message}
        >
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>

        <Button isLoading={isLoading} type="submit" color="primary">
          Register
        </Button>
      </form>
      {errorMessage && (
        <div className="w-full flex items-center my-3">
          <Alert color="danger" title={errorMessage} />
        </div>
      )}
      {successMessage && (
        <div className="w-full flex items-center my-3">
          <Alert color="success" title={successMessage} />
        </div>
      )}
    </div>
  );
}
