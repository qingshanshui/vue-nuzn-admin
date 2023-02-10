import {defineStore} from "pinia"
import {Local} from "/@/utils/storage";

/**
 * 系统设置
 * @methods setUserInfos 设置系统设置
 */
export const useThemeConfig = defineStore('themeConfig', {
    state: () => ({
        // 系统设置数据
        themeConfig: {
            //  默认初始语言，可选值"zh-cn|en"，默认 zh
            locale: 'zh-cn',
            // 深色模式，false 白色 true 深色
            isIsDark: false,
            // 水印
            isWarTerMark:false,
            // 水印字体
            warTerMarkText:"nuzn"
        },
    }),
    actions: {
        // 设置 系统设置
        async setThemeConfig(data: any) {
            this.themeConfig = data
            Local.set("theme", this.themeConfig)
        },
    }
})
