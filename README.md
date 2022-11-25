[![NPM version](https://img.shields.io/npm/v/jsdoc2vitepress.svg)](https://www.npmjs.com/package/jsdoc2vitepress)  [![NPM downloads](https://img.shields.io/npm/dm/jsdoc2vitepress.svg)](https://www.npmjs.com/package/jsdoc2vitepress)  [![NPM License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/luciozhang/jsdoc2vitepress/blob/master/LICENSE)

Generates vitepress API documentation from [jsdoc](https://jsdoc.app/) annotated source code.

What you need is to **write comments that conform to the jsdoc specification**, and `jsdoc2vitepress` will help you **generate API documentation by VitePress**.

# Install

```shell
npm install -D jsdoc2vitepress
```

# Usage

## Init docs directory

```shell
jsdoc2vitepress init 
```

##### What will happen?

In local Directory

![md目录](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/md-dir.png)

## Start VitePress

Generates vitepress API documentation from jsdoc annotated source code and run Vitepress

```shell
jsdoc2vitepress start
```

##### What will happen?

In console

![init&start](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_272765e2-b4c7-4a59-b7a8-8d4b9ec67a0e.png)

In local Directory

![md目录](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/md-dir.png)

In Once of the Markdown

![MD内容](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_7cfb6714-8217-4073-98b2-8003f9e6056b.png)

## Build VitePress

Generates vitepress API documentation from jsdoc annotated source code and build Vitepress

```shell
jsdoc2vitepress build
```

##### What will happen?

In console

![构建网站](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_8c94d14a-b220-44be-9d6a-8729a807dceb.png)

In local Directory

![vitepress-dist](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_069d259b-15da-43f5-b10c-08f65bd53feb.png)

Website

![文档网站](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_4812bc13-36b3-4b7d-b665-980bdcde46fc.png)

# How it work

JS/TS annotated source code -> Markdown ->VitePress website

![总体流程](https://blog-1256819047.cos.ap-guangzhou.myqcloud.com/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_512aa61a-aab5-48bc-8676-f01bf9430605.png)

See More detail in [注释生成文档太难看？试试用注释生成vitepress文档]()


# License
MIT

Copyright (c) 2022-present, luciozhang