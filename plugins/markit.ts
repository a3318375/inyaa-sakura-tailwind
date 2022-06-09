import {defineNuxtPlugin} from '#app';

import mdit from 'markdown-it';
import manchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import highlightLines from 'markdown-it-highlight-lines';
import hljs from 'highlight.js';

const markdownit = new mdit({
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {
            }
        }

        return '<pre class="hljs"><code>' + markdownit.utils.escapeHtml(str) + '</code></pre>';
    }
});


// const fenceDefaultRender = markdownit.renderer.rules.fence || function(tokens, idx, options, env, self) {
//     return self.renderToken(tokens, idx, options);
// };
//
// markdownit.renderer.rules.fence = function (tokens, idx, options, env, self) {
//     return '<div class="mockup-code">' + fenceDefaultRender(tokens, idx, options, env, self) + '</div>';
// };

markdownit.use(manchor);
markdownit.use(highlightLines);
markdownit.use(toc, {
    containerClass: 'TOC-text',
    listClass: 'toc-list',
    itemClass: 'toc-list-item',
    listType: 'ul',
    linkClass: 'px-5px py-10px',
    callback: function (html, ast) {
        markdownit.topHtml = html
    }
});
markdownit.disable([ 'link']);

markdownit.linkify.set({fuzzyEmail: false});


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('markit', markdownit);
});
