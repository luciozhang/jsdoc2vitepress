import ora from 'ora';
import fs from 'fs-extra';
import gitclone from 'git-clone/promise';
import path from 'path';

/**
 * @module init-docs
 * @description init docs directory
 */

/**
 * @exports initDocs "jsdoc2vitepress init" init docs directory
 */
export const initDocs = async () => {
  const loading = ora('init docs directory');
  try {
    const templateGitUrl = 'https://github.com/luciozhang/jsdoc2vitepress-template.git';
    const docsDir = path.resolve(process.cwd(), 'docs');
    await gitclone(templateGitUrl, docsDir, { checkout: 'master', shallow: true });
    fs.removeSync(path.join(docsDir, '.git'));
    loading.stop();
    loading.succeed('init docs directory success');
  } catch (error) {
    loading.stop();
    loading.fail(`init docs directory fail${error}`);
  }
};
