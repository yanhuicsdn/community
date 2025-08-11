"use client"

import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/layout/HeroSection"
import { ArticleList } from "@/components/ArticleList"
import { Sidebar } from "@/components/Sidebar"
import { Footer } from "@/components/layout/Footer"
import { Pagination } from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { mockArticles } from "@/lib/directus"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(10)
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(false)

  // 计算分页
  const totalArticles = mockArticles.length
  const totalPages = Math.ceil(totalArticles / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage

  // 排序和分页处理
  const getSortedArticles = () => {
    let sorted = [...mockArticles]

    switch (sortBy) {
      case 'popular':
        sorted.sort((a, b) => b.likes - a.likes)
        break
      case 'views':
        sorted.sort((a, b) => b.views - a.views)
        break
      case 'comments':
        sorted.sort((a, b) => b.comments_count - a.comments_count)
        break
      case 'newest':
      default:
        sorted.sort((a, b) =>
          new Date(b.date_published || b.date_created).getTime() -
          new Date(a.date_published || a.date_created).getTime()
        )
    }

    return sorted.slice(startIndex, endIndex)
  }

  const currentArticles = getSortedArticles()

  // Transform mock data to match the ArticleList component interface
  const transformedArticles = currentArticles.map(article => {
    const user = typeof article.user_created === 'object' ? article.user_created : null
    return {
      ...article,
      author: {
        name: user ? `${user.first_name} ${user.last_name}` : 'Unknown Author',
        avatar: user?.avatar
      },
      category: typeof article.category === 'object' ? article.category.name : 'Default',
      tags: article.tags?.map(tag => typeof tag === 'object' ? tag.name : tag) || [],
      published_at: article.date_published || article.date_created,
      comments: article.comments_count
    }
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">最新技术文章</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSortBy('newest')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'newest'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    最新发布
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'popular'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    最受欢迎
                  </button>
                  <button
                    onClick={() => setSortBy('views')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'views'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    浏览量
                  </button>
                  <button
                    onClick={() => setSortBy('comments')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'comments'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    评论数
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                共 {totalArticles} 篇文章，当前显示第 {startIndex + 1}-{Math.min(endIndex, totalArticles)} 篇
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">正在加载...</p>
                </div>
              </div>
            ) : (
              <>
                <ArticleList articles={transformedArticles} />

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalArticles}
                    itemsPerPage={articlesPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
