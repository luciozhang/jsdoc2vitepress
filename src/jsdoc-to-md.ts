import fs from 'fs-extra';
import path from 'path';
import jsdoc2md from 'jsdoc-to-markdown';
import ora from 'ora';

const configJ2VPath = path.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2vitepress.config.json');
const configJ2MPath = path.resolve(process.cwd(), 'docs', '.vitepress', 'jsdoc2md.config.json');

/**
 * @module jsdoc-to-md
 * @description Generates Markdown API documentation from jsdoc annotated source code.
 */

/**
 * @exports jsdocToMd Generates Markdown
 * @returns {Promise} Return promise to check if generate success
 */
export const jsdocToMd = async () => {
  const loading = ora('Generates Markdown');
  try {
    const { markdownDirs } = await fs.readJSON(configJ2VPath);

    await Promise.all(markdownDirs.map(async (sourceObject: any) => {
      const { root, output, ingoreList } = sourceObject;
      await makeMarkDownForFiles(root, output, ingoreList);
    }));
    loading.succeed('Generates Markdown success');
  } catch (error) {
    loading.fail(`Generates Markdown fail${error}`);
  }
};

const makeMarkDownForFiles = async (root: string, output: string, ingoreList: Array<string>) => {
  const fileList = await fs.readdir(root);
  await Promise.all(fileList.map(async (fileName) => {
    if (ingoreList.indexOf(fileName) === -1) {
      await makeMarkDownDoc(fileName, root, output);
    }
  }));
};

const makeMarkDownDoc = async (sourceName: string, sourceRootPath: string, outputPath: string) => {
  let sourcePath = `${sourceRootPath}/${sourceName}`;
  const outputName = sourceName.replace('.js', '').replace('.ts', '');

  const loading = ora(`Generates Markdown for ${sourcePath}`);
  try {
    // 处理js文件的路径，需要区分是文件或目录，目录会将目录下所有文件生成为一个md
    const stat = fs.lstatSync(sourcePath);
    if (stat.isDirectory()) {
      sourcePath = `${sourcePath}/*`;
    }

    const mdStr = await jsdoc2md.render({
      'example-lang': 'javascript',
      files: path.resolve(process.cwd(), sourcePath),
      'name-format': 'backticks',
      'heading-depth': 2,
      'module-index-format': 'none',
      configure: path.resolve(process.cwd(), configJ2MPath),
    });
    if (mdStr) {
      fs.outputFile(path.resolve(process.cwd(), `${outputPath}/${outputName}.md`), mdStr);
      loading.succeed('Generates Markdown success in ' + `${outputPath}/${outputName}.md`);
    }
  } catch (error) {
    loading.fail(`Generates Markdown fail for ${sourcePath}`);
  }
};

