document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            navHome: "Home",
            otherArticles: "Other Articles",
            commentsTitle: "Comments",
            loadingComments: "Loading comments...",
            noComments: "No comments yet. Be the first to share your thoughts!",
            joinDiscussion: "💬 Join Discussion on GitHub",
            commentError: "Unable to load comments. You can still join the discussion on GitHub.",
            rateLimitTitle: "GitHub API Rate Limit Reached",
            rateLimitMessage: "Please try again later, or view comments directly on GitHub.",
            authLoading: "Checking authentication...",
            loginWithGitHub: "🔐 Login with GitHub to Comment",
            logout: "Logout",
            commentPlaceholder: "Write your comment... (Markdown supported)",
            submitComment: "💬 Post Comment",
            previewComment: "👁️ Preview",
            loadMoreComments: "Load More Comments",
            postingComment: "Posting...",
            commentPosted: "Comment posted successfully!",
            commentError: "Error posting comment. Please try again."
        },
        zh: {
            navHome: "主页",
            otherArticles: "其他文章",
            commentsTitle: "评论",
            loadingComments: "加载评论中...",
            noComments: "暂无评论。快来分享你的想法吧！",
            joinDiscussion: "💬 在 GitHub 上参与讨论",
            commentError: "无法加载评论。你仍然可以在 GitHub 上参与讨论。",
            rateLimitTitle: "已达到 GitHub API 访问限制",
            rateLimitMessage: "请稍后再试，或直接在 GitHub 上查看评论。",
            authLoading: "检查登录状态...",
            loginWithGitHub: "🔐 使用 GitHub 登录来评论",
            logout: "登出",
            commentPlaceholder: "写下你的评论... (支持 Markdown 格式)",
            submitComment: "💬 发表评论",
            previewComment: "👁️ 预览",
            loadMoreComments: "加载更多评论",
            postingComment: "发表中...",
            commentPosted: "评论发表成功！",
            commentError: "发表评论时出错。请重试。"
        }
    };

    let currentLanguage = 'en';
    let currentArticle = null;
    let githubToken = null;
    let currentUser = null;
    let commentsPage = 1;
    let commentsPerPage = 10;
    let totalComments = 0;
    let loadedComments = 0;
    let commentsCache = {}; // Simple cache to reduce API calls

    // GitHub OAuth Configuration
    const GITHUB_CLIENT_ID = 'Ov23liCZWfsSMv0NFMkT'; // You'll need to set this
    const REDIRECT_URI = window.location.origin + '/auth-callback.html';

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

    // GitHub Authentication Functions
    const initializeAuth = () => {
        console.log('Initializing authentication...');
        
        // Check if GitHub Client ID is configured
        if (GITHUB_CLIENT_ID === 'YOUR_GITHUB_CLIENT_ID' || !GITHUB_CLIENT_ID) {
            console.log('GitHub OAuth not configured, showing login disabled state');
            showLogin();
            return;
        }
        
        // Check for stored token
        githubToken = localStorage.getItem('github_token');
        console.log('Stored token:', githubToken ? 'Found' : 'None');
        
        // Check for OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code && !githubToken) {
            console.log('OAuth code found, exchanging for token...');
            exchangeCodeForToken(code);
        } else if (githubToken) {
            console.log('Token found, verifying...');
            verifyToken();
        } else {
            console.log('No token or code, showing login');
            showLogin();
        }
    };

    const showLogin = () => {
        console.log('Showing login interface');
        const authLoading = document.getElementById('auth-loading');
        const authLogin = document.getElementById('auth-login');
        const authUser = document.getElementById('auth-user');
        const commentForm = document.getElementById('comment-form-container');
        
        if (authLoading) authLoading.style.display = 'none';
        if (authLogin) authLogin.style.display = 'block';
        if (authUser) authUser.style.display = 'none';
        if (commentForm) commentForm.style.display = 'none';
        
        console.log('Login interface updated');
    };

    const showUser = (user) => {
        currentUser = user;
        document.getElementById('auth-loading').style.display = 'none';
        document.getElementById('auth-login').style.display = 'none';
        document.getElementById('auth-user').style.display = 'flex';
        document.getElementById('user-avatar').src = user.avatar_url;
        document.getElementById('user-name').textContent = user.login;
        document.getElementById('comment-form-container').style.display = 'block';
    };

    const exchangeCodeForToken = async (code) => {
        try {
            // Note: In production, this should go through your backend server
            // This is a simplified example - you'll need a proper OAuth flow
            console.log('OAuth code received:', code);
            showLogin(); // Fallback to login for now
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            showLogin();
        }
    };

    const verifyToken = async () => {
        console.log('Verifying GitHub token...');
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const user = await response.json();
                console.log('Token verified, user:', user.login);
                showUser(user);
            } else {
                console.log('Token invalid, removing and showing login');
                localStorage.removeItem('github_token');
                githubToken = null;
                showLogin();
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            localStorage.removeItem('github_token');
            githubToken = null;
            showLogin();
        }
    };

    const initiateGitHubLogin = () => {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=public_repo`;
        window.location.href = authUrl;
    };

    const logout = () => {
        localStorage.removeItem('github_token');
        githubToken = null;
        currentUser = null;
        showLogin();
        document.getElementById('comment-form-container').style.display = 'none';
    };

    // Comment Functions
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
                        loadComments(currentArticle.github_issue, 1);
                        setupCommentLink(currentArticle.github_issue);
                    }
                });
        }
    };

    const loadComments = async (issueNumber, page = 1) => {
        const commentsContainer = document.getElementById('comments-list');
        
        // Check cache first
        const cacheKey = `${issueNumber}-${page}`;
        if (commentsCache[cacheKey]) {
            const cached = commentsCache[cacheKey];
            if (page === 1 && cached.comments.length === 0) {
                commentsContainer.innerHTML = `<div class="no-comments" data-key="noComments">${translations[currentLanguage].noComments}</div>`;
            } else if (page === 1) {
                commentsContainer.innerHTML = cached.comments.map(comment => createCommentHTML(comment)).join('');
                loadedComments = cached.comments.length;
            } else {
                cached.comments.forEach(comment => {
                    commentsContainer.insertAdjacentHTML('beforeend', createCommentHTML(comment));
                });
                loadedComments += cached.comments.length;
            }
            
            totalComments = cached.totalComments;
            const loadMoreContainer = document.getElementById('load-more-container');
            if (loadedComments < totalComments) {
                loadMoreContainer.style.display = 'block';
                commentsPage = page;
            } else {
                loadMoreContainer.style.display = 'none';
            }
            return;
        }
        
        if (page === 1) {
            commentsContainer.innerHTML = '<div class="loading-comments" data-key="loadingComments">Loading comments...</div>';
            applyTranslations();
        }
        
        try {
            // Prepare headers for authenticated requests if token is available
            const headers = {
                'Accept': 'application/vnd.github.v3+json'
            };
            if (githubToken) {
                headers['Authorization'] = `token ${githubToken}`;
            }

            // For page 1, get issue info to check total comments, otherwise skip this API call
            if (page === 1) {
                const issueResponse = await fetch(`https://api.github.com/repos/Kelukin/kelukin.github.io/issues/${issueNumber}`, { headers });
                if (issueResponse.ok) {
                    const issue = await issueResponse.json();
                    totalComments = issue.comments;
                } else if (issueResponse.status === 403) {
                    const errorData = await issueResponse.json();
                    if (errorData.message && errorData.message.includes('rate limit')) {
                        throw new Error('RATE_LIMIT');
                    }
                }
            }

            // Then fetch comments for the current page
            const response = await fetch(`https://api.github.com/repos/Kelukin/kelukin.github.io/issues/${issueNumber}/comments?per_page=${commentsPerPage}&page=${page}`, { headers });
            
            if (!response.ok) {
                if (response.status === 403) {
                    const errorData = await response.json();
                    if (errorData.message && errorData.message.includes('rate limit')) {
                        throw new Error('RATE_LIMIT');
                    }
                }
                throw new Error('Failed to fetch comments');
            }
            
            const comments = await response.json();
            
            // Cache the results
            commentsCache[cacheKey] = {
                comments: comments,
                totalComments: totalComments,
                timestamp: Date.now()
            };
            
            if (page === 1 && comments.length === 0) {
                commentsContainer.innerHTML = `<div class="no-comments" data-key="noComments">${translations[currentLanguage].noComments}</div>`;
            } else if (page === 1) {
                // Replace loading with first page of comments
                commentsContainer.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
                loadedComments = comments.length;
            } else {
                // Append additional comments
                comments.forEach(comment => {
                    commentsContainer.insertAdjacentHTML('beforeend', createCommentHTML(comment));
                });
                loadedComments += comments.length;
            }

            // Show/hide load more button
            const loadMoreContainer = document.getElementById('load-more-container');
            if (loadedComments < totalComments) {
                loadMoreContainer.style.display = 'block';
                commentsPage = page;
            } else {
                loadMoreContainer.style.display = 'none';
            }

        } catch (error) {
            console.error('Error loading comments:', error);
            if (page === 1) {
                if (error.message === 'RATE_LIMIT') {
                    commentsContainer.innerHTML = `
                        <div class="rate-limit-notice">
                            <p><strong>GitHub API Rate Limit Reached</strong></p>
                            <p>${currentLanguage === 'zh' ? 
                                '已达到 GitHub API 访问限制。请稍后再试，或者' : 
                                'GitHub API rate limit reached. Please try again later, or'
                            }</p>
                            <a href="https://github.com/Kelukin/kelukin.github.io/issues/${issueNumber}" target="_blank" class="github-link">
                                💬 ${currentLanguage === 'zh' ? '在 GitHub 上查看评论' : 'View Comments on GitHub'}
                            </a>
                        </div>
                    `;
                } else {
                    commentsContainer.innerHTML = `<div class="no-comments" data-key="commentError">${translations[currentLanguage].commentError}</div>`;
                }
            }
        }
    };

    const createCommentHTML = (comment) => {
        return `
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
        `;
    };

    const loadMoreComments = () => {
        if (currentArticle && currentArticle.github_issue) {
            const button = document.getElementById('load-more-btn');
            button.disabled = true;
            button.textContent = translations[currentLanguage].loadingComments;
            
            loadComments(currentArticle.github_issue, commentsPage + 1).then(() => {
                button.disabled = false;
                button.textContent = translations[currentLanguage].loadMoreComments;
            });
        }
    };

    const setupCommentLink = (issueNumber) => {
        const commentLink = document.getElementById('add-comment-link');
        if (commentLink) {
            commentLink.href = `https://github.com/Kelukin/kelukin.github.io/issues/${issueNumber}`;
        }
    };

    const previewComment = () => {
        const commentText = document.getElementById('comment-input').value;
        const previewContainer = document.getElementById('comment-preview');
        
        if (commentText.trim()) {
            previewContainer.innerHTML = `
                <h4>Preview:</h4>
                ${marked.parse(commentText)}
            `;
            previewContainer.style.display = 'block';
        } else {
            previewContainer.style.display = 'none';
        }
    };

    const submitComment = async () => {
        const commentText = document.getElementById('comment-input').value.trim();
        if (!commentText || !githubToken || !currentArticle || !currentArticle.github_issue) {
            return;
        }

        const submitBtn = document.getElementById('submit-comment-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = translations[currentLanguage].postingComment;

        try {
            const response = await fetch(`https://api.github.com/repos/Kelukin/kelukin.github.io/issues/${currentArticle.github_issue}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    body: commentText
                })
            });

            if (response.ok) {
                const newComment = await response.json();
                
                // Clear the cache since we have new comments
                commentsCache = {};
                
                // Add the new comment to the top of the list
                const commentsContainer = document.getElementById('comments-list');
                commentsContainer.insertAdjacentHTML('afterbegin', createCommentHTML(newComment));
                
                // Clear the form
                document.getElementById('comment-input').value = '';
                document.getElementById('comment-preview').style.display = 'none';
                
                // Show success message (briefly)
                submitBtn.textContent = translations[currentLanguage].commentPosted;
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
                
                // Update comment count
                totalComments++;
                loadedComments++;
                
            } else {
                throw new Error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            submitBtn.textContent = translations[currentLanguage].commentError;
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
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
        
        // Handle placeholder translations
        const commentInput = document.getElementById('comment-input');
        if (commentInput && translations[lang].commentPlaceholder) {
            commentInput.placeholder = translations[lang].commentPlaceholder;
        }
    };

    // Event Listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));
    document.getElementById('github-login-btn').addEventListener('click', initiateGitHubLogin);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('preview-btn').addEventListener('click', previewComment);
    document.getElementById('submit-comment-btn').addEventListener('click', submitComment);
    document.getElementById('load-more-btn').addEventListener('click', loadMoreComments);

    // Handle Enter key in comment input (Ctrl+Enter to submit)
    document.getElementById('comment-input').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            submitComment();
        }
    });

    // Initialize
    loadArticle();
    loadArticlesList();
    applyTranslations();
    
    // Initialize authentication with fallback
    try {
        initializeAuth();
    } catch (error) {
        console.error('Error initializing auth:', error);
        showLogin();
    }
    
    // Fallback timeout to ensure UI never gets stuck on "Checking authentication..."
    setTimeout(() => {
        const authLoading = document.getElementById('auth-loading');
        if (authLoading && authLoading.style.display !== 'none') {
            console.log('Auth initialization timeout, forcing login display');
            showLogin();
        }
    }, 3000);
});
