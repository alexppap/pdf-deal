<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center mb-6">颜色转换器</h1>

    <div class="flex justify-center mb-6">
      <input
        type="color"
        v-model="hexColor"
        @input="updateFromPicker"
        class="w-24 h-24 p-1 border-none cursor-pointer rounded-full"
      />
    </div>

    <div class="space-y-4">
      <div class="flex items-center">
        <label for="hex" class="w-16 font-semibold">HEX</label>
        <input
          id="hex"
          type="text"
          v-model="hexColor"
          @input="updateFromHex"
          class="flex-1 p-2 border rounded-md"
          :class="{ 'border-red-500': !isValid }"
        />
      </div>

      <div class="flex items-center">
        <label for="rgb" class="w-16 font-semibold">RGB</label>
        <input
          id="rgb"
          type="text"
          v-model="rgbColor"
          @input="updateFromRgb"
          class="flex-1 p-2 border rounded-md"
          :class="{ 'border-red-500': !isValid }"
        />
      </div>

      <div class="flex items-center">
        <label for="hsl" class="w-16 font-semibold">HSL</label>
        <input
          id="hsl"
          type="text"
          v-model="hslColor"
          @input="updateFromHsl"
          class="flex-1 p-2 border rounded-md"
          :class="{ 'border-red-500': !isValid }"
        />
      </div>
    </div>
    
    <div v-if="!isValid" class="mt-4 text-red-500 text-center text-sm">
        无效的颜色格式
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import tinycolor from 'tinycolor2'

const color = ref(tinycolor('#8A2BE2')) // 初始颜色：蓝紫色
const isValid = ref(true)

const hexColor = ref(color.value.toHexString())
const rgbColor = ref(color.value.toRgbString())
const hslColor = ref(color.value.toHslString())

const updateColors = (newColor) => {
  if (newColor.isValid()) {
    isValid.value = true
    color.value = newColor
    hexColor.value = newColor.toHexString()
    rgbColor.value = newColor.toRgbString()
    hslColor.value = newColor.toHslString()
  } else {
    isValid.value = false
  }
}

const updateFromPicker = (e) => {
  updateColors(tinycolor(e.target.value))
}

const updateFromHex = (e) => {
  const newColor = tinycolor(e.target.value)
  if (newColor.isValid()) {
    updateColors(newColor)
  } else {
    hexColor.value = e.target.value
    isValid.value = false
  }
}

const updateFromRgb = (e) => {
    const newColor = tinycolor(e.target.value)
    if(newColor.isValid()) {
        updateColors(newColor)
    } else {
        rgbColor.value = e.target.value
        isValid.value = false
    }
}

const updateFromHsl = (e) => {
    const newColor = tinycolor(e.target.value)
    if(newColor.isValid()) {
        updateColors(newColor)
    } else {
        hslColor.value = e.target.value
        isValid.value = false
    }
}
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}
</style> 