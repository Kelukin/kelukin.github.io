document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            navHome: "Home",
            otherArticles: "Other Articles",
            commentsTitle: "Comments"
        },
        zh: {
            navHome: "主页",
            otherArticles: "其他文章",
            commentsTitle: "评论"
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
            // Load article content
            fetch(`articles/${articleId}_${lang}.md`)
                .then(response => response.text())
                .then(text => {
                    const articleContainer = document.getElementById('article-content');
                    const articleHtml = marked.parse(text);
                    
                    // Insert article content before comments section
                    const commentsSection = articleContainer.querySelector('#comments-section');
                    articleContainer.insertAdjacentHTML('afterbegin', articleHtml);
                    
                    // Load Utterances comments after article is loaded
                    loadUtterancesComments(articleId);
                });
        }
    };

    const loadUtterancesComments = (articleId) => {
        const utterancesContainer = document.getElementById('utterances-container');
        
        // Clear any existing comments
        utterancesContainer.innerHTML = '';
        
        // Create Utterances script
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'Kelukin/kelukin.github.io');
        script.setAttribute('issue-term', 'pathname'); // Use pathname to maintain compatibility
        script.setAttribute('theme', 'dark-blue');
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('async', '');
        
        utterancesContainer.appendChild(script);
    };

    const loadArticlesList = () => {
        fetch('articles.json')
            .then(response => response.json())
            .then(data => {
                const articlesList = document.getElementById('articles-list-sidebar');
                articlesList.innerHTML = '';
                data.articles.forEach(article => {
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

    // Event Listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));

    // Initialize
    loadArticle();
    loadArticlesList();
    applyTranslations();
});
