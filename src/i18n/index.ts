import { createI18n } from 'vue-i18n';

// 引入 el 语言
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';

// 引入自定义 语言
import zhCn from './zh-cn';
import en from './en';

import pinia from '/@/stores/index';
// 解构赋值 响应式的 pinia
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
const stores = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(stores);

// 创建 i18n
export const i18n = createI18n({
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    fallbackWarn: false,
    locale: themeConfig.value.locale, // 默认语言
    messages: {
        'zh-cn': {
            ...zhCn, // 自定义中文
            ...zhLocale, // el 中文
        },
        'en': {
            ...en,// 自定义英文
            ...enLocale,// el 英文
        },
    },
});
