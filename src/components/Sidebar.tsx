"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, PlayCircle, ExternalLink, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const developerCourses = [
  {
    id: 1,
    title: "鸿蒙ArkTS开发语言基础",
    description: "通过学习本课程，学完本课程后你完学鸿蒙ArkTS开发语言基础",
    image: "https://ext.same-assets.com/3583378434/3509567426.png",
    students: 18874,
    lessons: 6,
    level: "初级"
  },
  {
    id: 2,
    title: "鸿蒙车机构和和灯控制开发",
    description: "通过学习本课程，学完本课程后你完学鸿蒙车机构和和灯控制开发",
    image: "https://ext.same-assets.com/3583378434/3936907249.png",
    students: 1118,
    lessons: 3,
    level: "中级"
  },
  {
    id: 3,
    title: "鸿蒙物联-智能冰箱仓储感应开发",
    description: "通过学习本课程，学完本课程后你完学鸿蒙物联-智能冰箱仓储感应开发",
    image: "https://ext.same-assets.com/3583378434/51345951.png",
    students: 671,
    lessons: 3,
    level: "高级"
  }
]

const liveStreams = [
  {
    id: 1,
    title: "AON AI Agent x DeepSeek：AI驱动开发创新",
    description: "人工智能飞速发展之际，DeepSeek 备受关注...",
    presenter: "AON AI Agent 开发者",
    avatar: "https://ext.same-assets.com/3583378434/3677345794.png",
    time: "2025-02-26 16:00:00",
    status: "即将开播"
  },
  {
    id: 2,
    title: "DTT华北开发者官典：AON AI Agent开发者空间大探访",
    description: "数字化转型时代背景下，消费技术不断涌现...",
    presenter: "AON AI Agent 开发者",
    avatar: "https://ext.same-assets.com/3583378434/3677345794.png",
    time: "2025-01-08 16:30:00",
    status: "回看"
  },
  {
    id: 3,
    title: "AON AI Agent，助力行业智能化转型...",
    description: "数字人是什么？如何构建让数字人走上天界...",
    presenter: "AON AI Agent 开发者",
    avatar: "https://ext.same-assets.com/3583378434/3677345794.png",
    time: "2024-12-11 16:30:00",
    status: "回看"
  }
]

const hotTags = [
  "AON AI Agent", "LLM", "RAG", "智能体开发", "CodeAgents", "模型训练", "智能服务"
]

const relatedProducts = [
  "AI Agent 服务",
  "专属于您的在线开发环境",
  "云主机",
  "AI 智能体平台",
  "2核4G云主机免费领",
  "免费体验 AI 智能体"
]

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* 开发者学堂 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>开发者学堂</span>
            <Link href="/courses" className="text-sm text-blue-600 hover:underline">
              查看更多 →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {developerCourses.map((course) => (
            <div key={course.id} className="group cursor-pointer">
              <div className="flex space-x-3">
                <div className="w-20 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{course.level}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <PlayCircle className="w-3 h-3" />
                      <span>{course.lessons}课</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 热门直播 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>热门直播</span>
            <Link href="/live" className="text-sm text-blue-600 hover:underline">
              查看更多 →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {liveStreams.map((stream) => (
            <div key={stream.id} className="group cursor-pointer">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={stream.avatar} />
                  <AvatarFallback>{stream.presenter[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge
                      variant={stream.status === "即将开播" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {stream.status}
                    </Badge>
                    <PlayCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {stream.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {stream.presenter}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {stream.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 热门标签 */}
      <Card>
        <CardHeader>
          <CardTitle>热门标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hotTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 相关产品 */}
      <Card>
        <CardHeader>
          <CardTitle>相关产品</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {relatedProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                  {product}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 统计信息 */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="https://ext.same-assets.com/3583378434/1035669505.jpeg"
                alt="AON AI Agent开发者空间"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <h3 className="font-semibold mb-1">AON AI Agent开发者空间</h3>
            <p className="text-blue-100 text-sm mb-4">
              https://huaweicloud.csdn.net
            </p>
            <div className="text-lg font-bold mb-2">4,617,781 成员</div>
            <p className="text-xs text-blue-100 leading-relaxed">
              AON AI Agent开发者空间，致力于为开发者提供优质开发资源及专业技术支持，汇聚开发者共话前沿开发技术及热门应用场景。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
