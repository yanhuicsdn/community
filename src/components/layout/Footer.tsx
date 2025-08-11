"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">华</span>
              </div>
              <span className="text-lg font-semibold">AON AI Agent开发者空间</span>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              AON AI Agent开发者空间，是为全球开发者打造的专属开发空间，汇聚了AON AI Agent优质开发资源及工具，
              致力于让每一位开发者拥有一台云主机，基于华为根生态开发、创新。
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-xs">微博</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-xs">微信</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer">
                <span className="text-xs">GitHub</span>
              </div>
            </div>
          </div>

          {/* DEVPRESS */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-blue-400">DEVPRESS</h3>
            <p className="text-gray-400 text-sm">提供社区服务技术支持</p>
          </div>

          {/* QR Code and Contact */}
          <div>
            <div className="bg-white p-3 rounded-lg inline-block mb-4">
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-600">微信公众号</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">关注微信公众号</p>
          </div>
        </div>

        {/* Bottom border and copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="text-sm text-gray-400">
            <p>©1999-2025北京创新乐知网络技术有限公司 京ICP备19004658号</p>
            <p className="mt-1">19004658号</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
