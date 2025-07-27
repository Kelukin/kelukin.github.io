document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            navHome: "Home",
            otherArticles: "Other Articles"
        },
        zh: {
            navHome: "主页",
            otherArticles: "其他文章"
        }
    };

    let currentLanguage = 'en';

    const getArticleId = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const getLanguage = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('lang') || 'en';
    };

    const setLanguage = (lang) => {
        const articleId = getArticleId();
        window.location.search = `?id=${articleId}&lang=${lang}`;
    };

    const loadArticle = () => {
        const articleId = getArticleId();
        const lang = getLanguage();
        currentLanguage = lang;

        if (articleId) {
            fetch(`articles/${articleId}_${lang}.md`)
                .then(response => response.text())
                .then(text => {
                    document.getElementById('article-content').innerHTML = marked.parse(text);
                });
        }
    };

    const loadArticlesList = () => {
        fetch('articles.json')
            .then(response => response.json())
            .then(articles => {
                const articlesList = document.getElementById('articles-list-sidebar');
                articlesList.innerHTML = '';
                articles.forEach(article => {
                    const listItem = document.createElement('li');
                    const title = currentLanguage === 'zh' ? article.title_zh : article.title_en;
                    listItem.innerHTML = `<a href="article.html?id=${article.id}&lang=${currentLanguage}">${title}</a>`;
                    articlesList.appendChild(listItem);
                });
            });
    };
    
    const applyTranslations = () => {
        const lang = getLanguage();
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            }
        });
    };

    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));

    loadArticle();
    loadArticlesList();
    applyTranslations();
});
