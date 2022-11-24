/**
 * @author luciozhang
 * @description js代码由注释生成markdown文件
 */

import fs from 'fs-extra';
import path from 'path';
import jsdoc2md from 'jsdoc-to-markdown';

const configJ2VPath = path.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2vitepress.config.json');
const configJ2MPath = path.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2md.config.json');

export const jsdocToMd = async () => {
  const { markdownDirs } = await fs.readJSON(configJ2VPath);

  markdownDirs.forEach(async (sourceObject: any) => {
    const { root, output, ingoreList } = sourceObject;

    const fileList = await fs.readdir(root);

    fileList.forEach((fileName) => {
      if (ingoreList.indexOf(fileName) === -1) {
        makeMarkDownDoc(fileName, root, output);
      }
    });
  });
};

const makeMarkDownDoc = (sourceName: string, sourceRootPath: string, outputPath: string) => {
  let sourcePath = `${sourceRootPath}/${sourceName}`;
  const outputName = sourceName.replace('.js', '').replace('.ts', '');

  // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
  const stat = fs.lstatSync(sourcePath);
  if (stat.isDirectory()) {
    sourcePath = `${sourcePath}/*`;
  }

  console.log('Start Generate Markdowm: ', sourcePath);

  jsdoc2md
    .render({
      'example-lang': 'javascript',
      files: path.resolve(process.cwd(), sourcePath),
      'name-format': 'backticks',
      'heading-depth': 2,
      'module-index-format': 'none',
      configure: path.resolve(process.cwd(), configJ2MPath),
    })
    .then((mdStr) => {
      // 删除第一行的a标签，要不vueperss生成侧边栏的时候，会出错
      const lines = mdStr.split('\n');
      lines.splice(0, 1);
      const newtext = lines.join('\n');
      // 获取剩下的一行
      fs.outputFile(path.resolve(process.cwd(), `${outputPath}/${outputName}.md`), newtext);
      console.log('Success Generate Markdowm: ', sourcePath);
    });
};

