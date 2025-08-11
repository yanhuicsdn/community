"use client"

import { LoginForm } from "@/components/auth/LoginForm"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const handleLoginSuccess = () => {
    // 登录成功后的处理
    console.log('Login successful, redirecting to:', redirectTo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-red-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto">
              华
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AON AI Agent 开发者社区
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                汇聚全球开发者智慧，共建技术生态
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900">丰富的技术内容</h3>
                <p className="text-sm text-gray-600">
                  涵盖云计算、AI、HarmonyOS等前沿技术
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">👥</span>
                </div>
                <h3 className="font-semibold text-gray-900">活跃的社区</h3>
                <p className="text-sm text-gray-600">
                  与全球开发者交流学习，共同成长
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🎓</span>
                </div>
                <h3 className="font-semibold text-gray-900">在线学习</h3>
                <p className="text-sm text-gray-600">
                  专业课程和实战项目，提升技能
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-sm">🚀</span>
                </div>
                <h3 className="font-semibold text-gray-900">技术支持</h3>
                <p className="text-sm text-gray-600">
                  官方技术支持，解决开发难题
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full">
          <LoginForm
            onSuccess={handleLoginSuccess}
            redirectTo={redirectTo}
          />

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile branding */}
      <div className="lg:hidden fixed top-4 left-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            华
          </div>
          <span className="font-semibold text-gray-900">AON AI Agent 开发者社区</span>
        </Link>
      </div>
    </div>
  )
}
