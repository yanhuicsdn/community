"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Bookmark, Eye, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mockArticles } from "@/lib/directus"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // 在实际应用中，这里会调用 DirectusAPI.getArticle(params.slug)
  const article = mockArticles.find(a => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  const user = typeof article.user_created === 'object' ? article.user_created : null
  const category = typeof article.category === 'object' ? article.category : null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const relatedArticles = mockArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">首页</Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-blue-600">
                  {category.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900">文章详情</span>
          </nav>

          {/* Title and Meta */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.first_name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">
                  {user ? `${user.first_name} ${user.last_name}` : 'Unknown Author'}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.date_published || article.date_created)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views} 次浏览</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>预计阅读时间 5 分钟</span>
                  </div>
                </div>
              </div>
            </div>

            {category && (
              <Badge variant="secondary">
                {category.name}
              </Badge>
            )}
          </div>

          {/* Featured Image */}
          {article.featured_image && (
            <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="text-lg text-gray-600 mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              {article.excerpt}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="prose prose-lg max-w-none">
            {/* 这里应该是富文本内容，现在使用模拟内容 */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {article.content || "这里是文章的主要内容。在实际应用中，这里会显示从Directus获取的富文本内容。"}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                技术概述
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本文将深入介绍相关技术的核心概念和实现方式，帮助开发者更好地理解和应用这些技术。
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                核心特性
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>高性能和可扩展性</li>
                <li>易于集成和使用</li>
                <li>完善的文档和社区支持</li>
                <li>持续的更新和维护</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                实践案例
              </h3>
              <p className="text-gray-700 leading-relaxed">
                通过具体的代码示例和实践案例，展示如何在实际项目中应用这些技术和方法。
              </p>

              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`// 示例代码
function example() {
  console.log("Hello, World!");
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">标签</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => {
                const tagName = typeof tag === 'object' ? tag.name : tag
                return (
                  <Badge key={tagName} variant="outline" className="cursor-pointer hover:bg-blue-50">
                    #{tagName}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>点赞 ({article.likes})</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>评论 ({article.comments_count})</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4" />
                <span>收藏</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>分享</span>
            </Button>
          </div>
        </div>

        {/* Author Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">关于作者</h3>
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.first_name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                {user ? `${user.first_name} ${user.last_name}` : 'Unknown Author'}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                AON AI Agent 社区活跃贡献者，专注于 AI 智能体开发和 LLM 技术。
              </p>
              <Button size="sm">关注作者</Button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">相关文章</h3>
            <div className="space-y-4">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="block group"
                >
                  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    {relatedArticle.featured_image && (
                      <div className="w-20 h-16 relative bg-gray-100 rounded flex-shrink-0">
                        <Image
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(relatedArticle.date_published || relatedArticle.date_created)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
