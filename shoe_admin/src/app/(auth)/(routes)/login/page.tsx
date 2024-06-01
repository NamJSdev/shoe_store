"use client";
import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import authApi from "@/app/api/auth";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const {setSesstionToken} = useAppContext();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);

    if (!valueLogin) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidValueLogin: false,
      });
      toast.error("Nhập Email đăng nhập của bạn !");
      return;
    }

    if (!password) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidPassword: false,
      });
      toast.error("Nhập mật khẩu của bạn !");
      return;
    }
    try {
      const response = await authApi.login(valueLogin, password);
      if(response){
        toast.success('Đăng nhập thành công')
      }
      const resultFromNextServer = await fetch('/api/auth',{
        method: 'POST',
        body: JSON.stringify(response),
        headers:{
            'Content-Type': 'application/json'
        },
      }).then(async(res)=>{
        const payload = await res.json();
        const data = {
            status:res.status,
            payload
        }
        if(!res.ok){
            throw data
        }
        return data
      })
      setSesstionToken(resultFromNextServer.payload.token)
      // Chuyển hướng sau khi đăng nhập thành công và nhận token
      router.push("/");
    } catch (error) {
      toast.error("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-[10%]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Đăng Nhập
        </CardTitle>
        <CardDescription className="text-center">
          <i className="text-center">(Nhập đầy đủ thông tin đăng nhập)</i>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@gmail.com"
              required
              type="email"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật Khẩu</Label>
            <Input
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleLogin}>
            Đăng Nhập
          </Button>
        </div>
        <CardDescription className="text-center mt-3">
          <i className="text-center">
            Bạn muốn đổi mật khẩu -{" "}
            <Link href="/changePass" className="text-red-600">
              <b>Đổi mật khẩu</b>
            </Link>
          </i>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
