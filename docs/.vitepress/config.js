import { getSideBar } from 'vitepress-plugin-autobar';

module.exports = {
  title: 'xxx', // 设置网站标题
  description: 'xxx xxx',
  base: '/', // 设置站点根路径
  outDir: './dist', // 设置输出目录
  repo: '', // 添加 git 链接
  markdown: {
    toc: { includeLevel: [2, 3] },
  },
  themeConfig: {
    // 添加导航栏
    nav: [
      {
        text: 'xxx',
        link: '',
        target:'_self',
      },
    ],
    sidebar: getSideBar('./docs',  {
      ignoreMDFiles: ['index'],
    }),
  },
};
