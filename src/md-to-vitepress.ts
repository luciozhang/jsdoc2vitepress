import shell from 'shelljs';
/**
 * @module md-to-vitepress
 * @description Generates VitePress API documentation from jsdoc annotated source code.
 */

/**
 * @exports startVitePress Run VitePress server
 * @returns {Promise} Return promise to check if run success
 */
export const startVitePress = async () => {
  shell.exec('node_modules/.bin//vitepress dev docs');
};

/**
 * @exports buildVitePress build VitePress server
 * @returns {Promise} Return promise to check if build success
 */
export const buildVitePress = async () => {
  shell.exec('node_modules/.bin/vitepress build docs');
};
