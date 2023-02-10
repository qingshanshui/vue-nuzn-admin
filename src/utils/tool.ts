import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NzunIcon from '/@/components/icon/index.vue'
/**
 * 数组转tree
 * @param arr
 * @param pid
 */
import {App} from "vue";

export function arrayToTree(arr: any, pid: any) {
    if (!Array.isArray(arr) || !arr.length) return [];
    let res: any = []
    arr.forEach(item => {
        if (item.parentUid == pid) {
            item.children = arrayToTree(arr, item.uid);
            res.push(item)
        }
    })
    return res.sort((a: any, b: any) => b.order - a.order)
}

/**
 * tree排序  递归排序tree
 * @param arr
 * @constructor
 */
export function TreeToSort(arr: any) {
    if (!Array.isArray(arr) && arr.length > 0) return []
    let res = []
    res = arr.sort((a: any, b: any) => b.order - a.order)
    res.forEach((ele: any) => {
        if (ele.children && ele.children.length > 0) {
            ele.children = TreeToSort(ele.children)

        }
    })

    return res
}

/**
 * element - icon 注册 el icon
 * @param app
 */
export function elSvg(app: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.component('NzunIcon',NzunIcon)
}

const cssCdnUrlList:Array<string> = [
    'https://at.alicdn.com/t/c/font_3606781_22fynktjb6q.css',
]
const jsCdnUrlList:Array<string> = []

/**
 * 动态设置 css
 */
export function setCssCdn() {
    if (cssCdnUrlList.length <= 0) return false;
    cssCdnUrlList.forEach((ele) => {
        let link = document.createElement('link')
        link.rel = 'stylesheet';
        link.href = ele
        link.crossOrigin = 'anonymous';
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}

/**
 * 动态设置 js
 */
export function setJsCdn() {
    if (jsCdnUrlList.length <= 0) return false;
    jsCdnUrlList.forEach((ele) => {
        let link = document.createElement('script');
        link.src = ele;
        document.body.appendChild(link);
    })
}
const tool = {
    slSvg: (app: App) => {
        elSvg(app)
    },
    setCssCdn: () => {
        setCssCdn()
    },
    setJsCdn: () => {
        setJsCdn()
    }
}

export default tool
