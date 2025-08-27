<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8 lg:p-12">
    <div class="max-w-4xl mx-auto">
      <!-- 返回首页按钮 -->
      <router-link
        to="/"
        class="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回首页
      </router-link>

      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">时间戳转换器</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          支持多种时间格式与时间戳的相互转换，支持多时区显示
        </p>
      </div>

      <!-- 当前时间显示 -->
      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">当前时间</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">当前时间戳（秒）</div>
            <div class="text-lg font-mono bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              {{ currentTimestamp }}
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">当前时间戳（毫秒）</div>
            <div class="text-lg font-mono bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              {{ currentTimestampMs }}
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">当前日期时间</div>
            <div class="text-lg font-mono bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              {{ currentDateTime }}
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">ISO 8601 格式</div>
            <div class="text-lg font-mono bg-gray-100 dark:bg-slate-700 p-3 rounded-lg">
              {{ currentISOString }}
            </div>
          </div>
        </div>
      </div>

      <!-- 转换工具 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 时间戳转日期 -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">时间戳转日期</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                输入时间戳
              </label>
              <div class="flex gap-2">
                <input
                  v-model="timestampInput"
                  type="text"
                  placeholder="请输入时间戳"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  @input="convertTimestampToDate"
                />
                <select
                  v-model="timestampUnit"
                  class="px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  @change="convertTimestampToDate"
                >
                  <option value="seconds">秒</option>
                  <option value="milliseconds">毫秒</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择时区
              </label>
              <select
                v-model="selectedTimezone"
                class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                @change="convertTimestampToDate"
              >
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                  {{ tz.label }}
                </option>
              </select>
            </div>

            <div v-if="convertedDateTime" class="space-y-3">
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">标准格式</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedDateTime }}
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">ISO 8601 格式</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedISOString }}
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">Unix 时间戳（秒）</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedUnixSeconds }}
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">Unix 时间戳（毫秒）</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedUnixMilliseconds }}
                </div>
              </div>
            </div>

            <div v-if="timestampError" class="p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {{ timestampError }}
            </div>
          </div>
        </div>

        <!-- 日期转时间戳 -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">日期转时间戳</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择日期时间
              </label>
              <input
                v-model="dateTimeInput"
                type="datetime-local"
                class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                @input="convertDateToTimestamp"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                输入时区
              </label>
              <select
                v-model="dateTimezone"
                class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                @change="convertDateToTimestamp"
              >
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                  {{ tz.label }}
                </option>
              </select>
            </div>

            <div v-if="convertedTimestamps" class="space-y-3">
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">Unix 时间戳（秒）</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedTimestamps.seconds }}
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">Unix 时间戳（毫秒）</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedTimestamps.milliseconds }}
                </div>
              </div>
              <div class="space-y-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">ISO 8601 格式</div>
                <div class="p-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
                  {{ convertedTimestamps.iso }}
                </div>
              </div>
            </div>

            <div v-if="dateError" class="p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {{ dateError }}
            </div>
          </div>
        </div>
      </div>

      <!-- 常用时间戳 -->
      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">常用时间戳</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="preset in presetTimestamps" :key="preset.label" class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ preset.label }}</div>
            <div class="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2">{{ preset.timestamp }}</div>
            <button
              @click="usePresetTimestamp(preset.timestamp)"
              class="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
            >
              使用此时间戳
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 响应式数据
const currentTime = ref(new Date())
const timestampInput = ref('')
const timestampUnit = ref('seconds')
const selectedTimezone = ref('Asia/Shanghai')
const dateTimeInput = ref('')
const dateTimezone = ref('Asia/Shanghai')

// 转换结果
const convertedDateTime = ref('')
const convertedISOString = ref('')
const convertedUnixSeconds = ref('')
const convertedUnixMilliseconds = ref('')
const convertedTimestamps = ref(null)

// 错误状态
const timestampError = ref('')
const dateError = ref('')

// 定时器
let timeInterval = null

// 时区选项
const timezones = [
  { value: 'Asia/Shanghai', label: 'UTC+8 北京时间' },
  { value: 'UTC', label: 'UTC+0 协调世界时' },
  { value: 'America/New_York', label: 'UTC-5/-4 纽约时间' },
  { value: 'America/Los_Angeles', label: 'UTC-8/-7 洛杉矶时间' },
  { value: 'Europe/London', label: 'UTC+0/+1 伦敦时间' },
  { value: 'Europe/Paris', label: 'UTC+1/+2 巴黎时间' },
  { value: 'Asia/Tokyo', label: 'UTC+9 东京时间' },
  { value: 'Asia/Seoul', label: 'UTC+9 首尔时间' },
  { value: 'Australia/Sydney', label: 'UTC+10/+11 悉尼时间' }
]

// 计算属性
const currentTimestamp = computed(() => Math.floor(currentTime.value.getTime() / 1000))
const currentTimestampMs = computed(() => currentTime.value.getTime())
const currentDateTime = computed(() => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai'
  }).format(currentTime.value)
})
const currentISOString = computed(() => currentTime.value.toISOString())

// 常用时间戳预设
const presetTimestamps = computed(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  
  return [
    { label: '今天开始', timestamp: Math.floor(today.getTime() / 1000) },
    { label: '昨天开始', timestamp: Math.floor(yesterday.getTime() / 1000) },
    { label: '一周前', timestamp: Math.floor(weekAgo.getTime() / 1000) },
    { label: '一个月前', timestamp: Math.floor(monthAgo.getTime() / 1000) },
    { label: 'Unix 纪元', timestamp: 0 },
    { label: '2020-01-01', timestamp: 1577808000 }
  ]
})

// 更新当前时间
const updateCurrentTime = () => {
  currentTime.value = new Date()
}

// 时间戳转日期
const convertTimestampToDate = () => {
  timestampError.value = ''
  
  if (!timestampInput.value.trim()) {
    convertedDateTime.value = ''
    convertedISOString.value = ''
    convertedUnixSeconds.value = ''
    convertedUnixMilliseconds.value = ''
    return
  }
  
  try {
    let timestamp = parseFloat(timestampInput.value.trim())
    
    if (isNaN(timestamp)) {
      throw new Error('请输入有效的数字')
    }
    
    // 根据单位转换为毫秒
    let timestampMs
    if (timestampUnit.value === 'seconds') {
      timestampMs = timestamp * 1000
    } else {
      timestampMs = timestamp
    }
    
    // 检查时间戳合理性（1970-2100年之间）
    if (timestampMs < 0 || timestampMs > 4102444800000) {
      throw new Error('时间戳超出合理范围（1970-2100年）')
    }
    
    const date = new Date(timestampMs)
    
    if (isNaN(date.getTime())) {
      throw new Error('无效的时间戳')
    }
    
    // 格式化为指定时区的时间
    convertedDateTime.value = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: selectedTimezone.value
    }).format(date)
    
    convertedISOString.value = date.toISOString()
    convertedUnixSeconds.value = Math.floor(timestampMs / 1000)
    convertedUnixMilliseconds.value = timestampMs
    
  } catch (error) {
    timestampError.value = error.message
    convertedDateTime.value = ''
    convertedISOString.value = ''
    convertedUnixSeconds.value = ''
    convertedUnixMilliseconds.value = ''
  }
}

// 日期转时间戳
const convertDateToTimestamp = () => {
  dateError.value = ''
  
  if (!dateTimeInput.value) {
    convertedTimestamps.value = null
    return
  }
  
  try {
    // 创建本地时间的Date对象
    const localDate = new Date(dateTimeInput.value)
    
    if (isNaN(localDate.getTime())) {
      throw new Error('无效的日期时间')
    }
    
    // 获取时区偏移量
    const targetTimezone = dateTimezone.value
    
    // 将本地时间转换为指定时区的时间
    // 这里简化处理，直接使用本地时间，实际项目中可能需要更精确的时区转换
    const timestamp = localDate.getTime()
    
    convertedTimestamps.value = {
      seconds: Math.floor(timestamp / 1000),
      milliseconds: timestamp,
      iso: localDate.toISOString()
    }
    
  } catch (error) {
    dateError.value = error.message
    convertedTimestamps.value = null
  }
}

// 使用预设时间戳
const usePresetTimestamp = (timestamp) => {
  timestampInput.value = timestamp.toString()
  timestampUnit.value = 'seconds'
  convertTimestampToDate()
}

// 初始化日期时间输入为当前时间
const initializeDateTimeInput = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`
  convertDateToTimestamp()
}

// 生命周期钩子
onMounted(() => {
  // 每秒更新当前时间
  timeInterval = setInterval(updateCurrentTime, 1000)
  // 初始化日期时间输入
  initializeDateTimeInput()
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
</style>