/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { addToast, Alert, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/LoginSchema";
import { loginUserAPI } from "../services/AuthService"
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { getLoggedUserDataApi } from "../services/UserService";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {isLoggedIn, setIsLoggedIn} = useContext(authContext);

  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: "hello@gmail.com",
      password: "Yousef@123",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function loginUser(formData) {
    setIsLoading(true);
    const data = await loginUserAPI(formData);
    console.log(data);
    if (data.type === "error") {
      setErrorMessage(data.message);
    } else {
      setErrorMessage(null);
      localStorage.setItem("token", data.token);
      
      setIsLoggedIn(true);
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <div className="my-[50px] p-10 shadow-2xl rounded-xl">
      <h1 className="mb-5 text-center">Login Form</h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(loginUser)}
      >
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
        <Button isLoading={isLoading} type="submit" color="primary">
          Login
        </Button>
      </form>
      {errorMessage && (
        <div className="w-full flex items-center my-3">
          <Alert color="danger" title={errorMessage} />
        </div>
      )}
      <p className="mt-2 link">you don't have an account : 
        <Link to="/register" className="text-primary-600"> create account</Link>
      </p>
    </div>
  );
}
