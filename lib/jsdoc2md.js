'use strict';
/**
 * @author luciozhang
 * @description js代码由注释生成markdown文件
 */
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const fs_extra_1 = __importDefault(require('fs-extra'));
const path_1 = __importDefault(require('path'));
const jsdoc_to_markdown_1 = __importDefault(require('jsdoc-to-markdown'));
//  import { MD_FILES, JSDOC2MD_CONFIG } from '__docs__/';
const MD_FILES = [];
const JSDOC2MD_CONFIG = '';
const makeMarkDownDoc = function (sourceName, sourceRootPath, outputPath) {
  let sourcePath = `${sourceRootPath}/${sourceName}`;
  const outputName = sourceName.replace('.js', '').replace('.ts', '');
  // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
  const stat = fs_extra_1.default.lstatSync(sourcePath);
  if (stat.isDirectory()) {
    sourcePath = `${sourcePath}/*`;
  }
  console.log('Start Generate Markdowm: ', sourcePath);
  jsdoc_to_markdown_1.default
    .render({
      'example-lang': 'javascript',
      files: path_1.default.resolve(process.cwd(), sourcePath),
      'name-format': 'backticks',
      'heading-depth': 2,
      'module-index-format': 'none',
      configure: path_1.default.resolve(process.cwd(), JSDOC2MD_CONFIG),
    })
    .then((mdStr) => {
      // 删除第一行的a标签，要不vueperss生成侧边栏的时候，会出错
      const lines = mdStr.split('\n');
      lines.splice(0, 1);
      const newtext = lines.join('\n');
      // 获取剩下的一行
      fs_extra_1.default.outputFile(path_1.default.resolve(process.cwd(), `${outputPath}/${outputName}.md`), newtext);
      console.log('Success Generate Markdowm: ', sourcePath);
    });
};
MD_FILES.forEach((sourceObject) => {
  const { root, output, ingoreList } = sourceObject;
  const fileList = fs_extra_1.default.readdirSync(root);
  fileList.forEach((fileName) => {
    if (ingoreList.indexOf(fileName) === -1) {
      makeMarkDownDoc(fileName, root, output);
    }
  });
});
// # sourceMappingURL=jsdoc2md.js.map
