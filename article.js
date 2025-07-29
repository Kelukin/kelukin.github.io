document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            navHome: "Home",
            otherArticles: "Other Articles",
            commentsTitle: "Comments",
            loadingComments: "Loading comments...",
            noComments: "No comments yet. Be the first to share your thoughts!",
            addComment: "💬 Join the Discussion on GitHub",
            commentError: "Unable to load comments. You can still join the discussion on GitHub."
        },
        zh: {
            navHome: "主页",
            otherArticles: "其他文章",
            commentsTitle: "评论",
            loadingComments: "加载评论中...",
            noComments: "暂无评论。快来分享你的想法吧！",
            addComment: "💬 在 GitHub 上参与讨论",
            commentError: "无法加载评论。你仍然可以在 GitHub 上参与讨论。"
        }
    };

    let currentLanguage = 'en';
    let currentArticle = null;

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (currentLanguage === 'zh') {
            return date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
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
                });

            // Load article metadata for comments
            fetch('articles.json')
                .then(response => response.json())
                .then(data => {
                    currentArticle = data.articles.find(article => article.id === articleId);
                    if (currentArticle && currentArticle.github_issue) {
                        loadComments(currentArticle.github_issue);
                        setupCommentLink(currentArticle.github_issue);                    }
                });
        }
    };

    const loadComments = async (issueNumber) => {
        const commentsContainer = document.getElementById('comments-list');
        
        try {
            // GitHub API endpoint for issue comments
            const response = await fetch(`https://api.github.com/repos/Kelukin/kelukin.github.io/issues/${issueNumber}/comments`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            
            const comments = await response.json();
            
            if (comments.length === 0) {
                commentsContainer.innerHTML = `<div class="no-comments" data-key="noComments">${translations[currentLanguage].noComments}</div>`;
            } else {
                commentsContainer.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <div class="comment-header">
                            <img src="${comment.user.avatar_url}" alt="${comment.user.login}" class="comment-avatar">
                            <span class="comment-author">${comment.user.login}</span>
                            <span class="comment-date">${formatDate(comment.created_at)}</span>
                        </div>
                        <div class="comment-body">
                            ${marked.parse(comment.body)}
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsContainer.innerHTML = `<div class="no-comments" data-key="commentError">${translations[currentLanguage].commentError}</div>`;
        }
    };

    const setupCommentLink = (issueNumber) => {
        const commentLink = document.getElementById('add-comment-link');
        if (commentLink) {
            commentLink.href = `https://github.com/Kelukin/kelukin.github.io/issues/${issueNumber}`;
        }
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

    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));

    loadArticle();
    loadArticlesList();
    applyTranslations();
});
