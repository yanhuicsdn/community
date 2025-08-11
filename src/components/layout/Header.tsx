"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-sm text-center">
        免费体验 AI 智能体！AON AI Agent 开发者空间全新升级，开发效率提升10倍！
        <Button variant="outline" size="sm" className="ml-2 text-blue-600 bg-white hover:bg-gray-100">
          立即访问
        </Button>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">华</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">AON AI Agent开发者空间</span>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                开发者空间
              </Link>
              <Link href="/deepseek" className="text-gray-700 hover:text-blue-600 font-medium">
                DeepSeek企业级
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-blue-600 font-medium">
                算力入口
              </Link>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  更多
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const query = formData.get('search') as string
              if (query.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
              }
            }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  name="search"
                  placeholder="搜索技术文章、活动、课程..."
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </form>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              加入社区
            </Button>
            <Button variant="outline" className="text-gray-700 border-gray-300" asChild>
              <Link href="/login">
                登录
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
