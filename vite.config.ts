/*
 * @Description:
 * @Author: 刘洋
 * @Date: 2022-07-25 19:44:13
 * @LastEditTime: 2022-07-25 21:33:29
 * @LastEditors: xxx
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};
const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: { alias },
	server: {
		host: '0.0.0.0',
		port: 8888,
		open: false,
		proxy: {
			'/v1/basic': 'http://127.0.0.1:8000', // 本地接口
			// '/basic': 'http://api.nuzn.cn/', // 线上接口
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].${new Date().getTime()}.js`,
				chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
				assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
				compact: true,
				manualChunks: {
					vue: ['vue', 'vue-router', 'pinia'],
				},
			},
		},
	},
});
