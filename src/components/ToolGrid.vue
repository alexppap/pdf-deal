<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8 sm:p-12 lg:p-16">
    <h1 class="text-4xl font-extrabold text-center mb-16 text-gray-800 dark:text-white">
      功能强大的工具集
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <!-- PDF 合并工具 -->
      <router-link
        to="/print-fax"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">PDF 合并工具</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            将多个PDF文件合并到单个A4页面中，方便打印或传真。
          </p>
        </div>
      </router-link>

      <!-- 颜色转换器 -->
      <router-link
        to="/color-converter"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-purple-500 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">颜色转换器</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            在 HEX, RGB, HSL 等常用颜色格式之间进行转换。
          </p>
        </div>
      </router-link>

      <!-- JSON 工具 -->
      <router-link
        to="/json-tools"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-green-500 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">JSON 工具</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            格式化、压缩和验证您的 JSON 数据。
          </p>
        </div>
      </router-link>

      <!-- 图片格式转换器 -->
      <router-link
        to="/image-converter"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-orange-500 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">图片格式转换器</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            支持 JPG、PNG、WebP、GIF 等格式之间的转换。
          </p>
        </div>
      </router-link>

      <!-- 图片裁剪与调整工具 -->
      <router-link
        to="/image-editor"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">图片裁剪调整</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            支持图片裁剪、尺寸调整、旋转和翻转等编辑功能。
          </p>
        </div>
      </router-link>

      <!-- 时间戳转换器 -->
      <router-link
        to="/timestamp-converter"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-yellow-500 dark:text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">时间戳转换器</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            支持多种时间格式与时间戳的相互转换，支持多时区显示。
          </p>
        </div>
      </router-link>

      <!-- 正则表达式测试器 -->
      <router-link
        to="/regex-tester"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-teal-500 dark:text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">正则表达式测试器</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            实时测试正则表达式，高亮显示匹配结果，提供常用模式库。
          </p>
        </div>
      </router-link>

      <!-- 随机数生成器 -->
      <router-link
        to="/random-generator"
        class="group block p-6 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      >
        <div class="flex flex-col items-center text-center">
          <div class="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-xl mb-4 transition-colors">
            <svg
              class="w-8 h-8 text-pink-500 dark:text-pink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">随机数生成器</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            生成随机数字、字符串、UUID、颜色和安全密码等。
          </p>
        </div>
      </router-link>

      <!-- 更多工具 -->
      <div
        class="group flex flex-col items-center justify-center text-center p-6 bg-gray-100/80 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl transition-all duration-300 hover:border-indigo-400 hover:bg-white/80 dark:hover:bg-slate-700/80"
      >
        <div
          class="p-3 bg-gray-200 dark:bg-slate-700/60 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 rounded-xl mb-4 transition-colors"
        >
          <svg
            class="w-8 h-8 text-gray-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">添加新工具</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          更多实用工具正在火速开发中，敬请期待！
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped></style> 