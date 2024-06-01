'use client'
import React, { useState } from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function ChangePassPage() {
  return (
    <Card className="mx-auto max-w-sm mt-[5%]">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đổi Mật Khẩu</CardTitle>
            <CardDescription className="text-center"><i className="text-center">(Nhập đầy đủ thông tin để cập nhật mật khẩu mới)</i></CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@gmail.com" required type="email" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu cũ</Label>
                <Input id="password" required type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu mới</Label>
                <Input id="password" required type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Xác nhận lại mật khẩu</Label>
                <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
                Cập Nhật
            </Button>
            </div>
            <CardDescription className="text-center mt-3"><i className="text-center"><Link href="/login" className="text-red-600"><b>Đăng Nhập</b></Link></i></CardDescription>
        </CardContent>
    </Card>
  )
}
