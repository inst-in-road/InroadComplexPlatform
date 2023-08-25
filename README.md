<!--
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-08-25 11:30:16
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-25 11:30:56
 * @FilePath: \InroadComplexPlatform\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 项目名称
络盒演示系统

# 技术选型
项目基于 Vue 3.2、Pinia、TS、Element Plus、Vueuse 和 Wujie-Vue3 技术的 Web 应用程序。Pinia 是一个状态管理库，它使用了 Vue 3.0 的新功能，比 Vuex 更简单而且性能更好。TS（TypeScript）是一种静态类型检查和语言扩展功能的编程语言，它有助于提高代码质量、可维护性和开发效率。Element Plus 是一套基于 Vue 3.0 的 UI 组件库，它拥有美观、实用、易于组合和可自定义的组件，非常适合构建中大型 Web 应用程序。Vueuse 是一组基于 Vue 3.0 的功能性应用程序库，它提供了用于增强应用程序可读性、可维护性和性能的常用自定义钩子。无界是腾讯团队开源的微前端框架，是一款基于 Web Components + iframe 微前端框架，具备成本低、速度快、原生隔离、功能强等一系列优点。

## 安装说明

请按以下步骤进行安装：

1. 安装依赖库：

    ```
    $ pnpm install
    ```

2. 运行本地开发环境：

    ```
    $ pnpm dev
    ```

## 项目结构

在这里你可以简单的介绍整个项目的结构以及每个目录的作用。例如：

├── README.md       // 项目说明文档
├── dist            // 打包后的文件夹
├── src             // 源代码
│   ├── api         // API请求相关
│   ├── components  // 组件相关
│   ├── assets         // 静态资源
│   ├── views       // 页面相关
│   ├── directives      // 自定义指令
│   ├── routers      // 路由配置
│   ├── layouts      //  布局配置
│   ├── utils      // 工具函数
│   ├── hooks      // hooks钩子
│   └── stores       // pinia状态管理
└── package.json    // 依赖包管理文件


