<script setup>
import { useMobileStore } from '~/stores/MobileMenu';
const props = defineProps({
    color: {
        type: String,
        default: 'bg-button-primary',
    },
    text: {
        type: String,
        default: 'text-button-text-primary'
    },
    border: {
        type: String,
        default: 'r'
    },
    hover: {
        type: String,
        default: 'hover:bg-button-primary-hover',
    },
    hoverText: {
        type: String,
        default: 'hover:text-white'
    },

    radius: {
        type: String,
        default: 'rounded-base'
    },

    fromFooter: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

</script>
<template>
    <button
        class="uppercase px-6 text-sm py-4 font-semibold max-[1024px]:text-xs transition-all border-b-1 disabled:pointer-events-none disabled:opacity-50 shadow-md disabled:cursor-not-allowed"
        :class="[color, text, hover, hoverText, radius, {
            'max-[820px]:hidden': false,
            'max-[820px]:w-1/2': fromFooter,
            'max-[820px]:w-full': !fromFooter
        }]"
         type="button"
        :disabled="disabled"
      > 
       <slot>Регистрация</slot>
      </button>
</template>