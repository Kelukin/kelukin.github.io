document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            welcome: "Welcome to Kelukin Lau's Page",
            heroSubtitle: "Software Engineer ( May be Thinker | Explorer as well) ",
            navAbout: "About Me",
            navProjects: "Projects",
            navExperience: "Work Experience",
            navArticles: "Articles",
            navContact: "Contact",
            aboutTitle: "About Me",
            aboutText: "Hello! I'm Kelukin Lau. I'm a software engineer based in Shanghai. I'm passionate about scuba diving, programing, thinking, philosophy.",
            projectsTitle: "Projects",
            project1Title: "Project 1",
            project1Desc: "A brief description of your first project.",
            project2Title: "Project 2",
            project2Desc: "A brief description of your second project.",
            experienceTitle: "Work Experience",
            job1Title: "SDE II at Microsoft",
            job1Date: "Sep 2024 - Present",
            job1Location: "Shanghai, China",
            job1Team: "Microsoft Exchange Server | Mail-Service Team",
            job1Resp1: "Responsible for the Mailbox Rules module, including feature alignment from Win32 to web, rapid incident response, and the design and implementation of backend monitoring metrics.",
            job1Resp2: "Participated in the modernization of Exchange Server architecture, contributing to the evolution of a legacy system into a more efficient and maintainable platform.",
            job1Skills: ".NET Framework · Full-Stack Development",
            job2Title: "SDE at Microsoft",
            job2Date: "Jul 2021 - Sep 2024",
            job2Location: "Shanghai, China",
            job2Team: "Microsoft Purview (formerly Azure Purview)",
            job2Resp1: "Led the metadata migration from Azure Purview to Microsoft Purview, focusing on database traffic management, monitoring metrics, and proactive alerting to ensure a smooth and reliable transition.",
            job2Resp2: "Drove the development of the Purview-Egeria Connector, enabling integration of external metadata platforms into Microsoft Purview.",
            job2Resp3: "Actively contributed to DevOps operations, supporting CI/CD pipelines and maintaining system stability within the team.",
            job2Skills: "Java · Metadata Management · DevOps",
            articlesTitle: "My Articles",
            contactTitle: "Contact Me",
            contactText: "You can reach me at kelukin@gmail.com",
            linkedinLink: "LinkedIn",
            footerText: "&copy; 2025 Kelukin Lau"
        },
        zh: {
            welcome: "欢迎来到刘笑尘的主页",
            heroSubtitle: "软件工程师 (可能也是思考者 | 探索者)",
            navAbout: "关于我",
            navProjects: "项目",
            navExperience: "工作经历",
            navArticles: "文章",
            navContact: "联系方式",
            aboutTitle: "关于我",
            aboutText: "你好！我是刘笑尘。我是一名软件工程师，现居上海。我热衷于水肺潜水、编程、思考、哲学。",
            projectsTitle: "项目",
            project1Title: "项目一",
            project1Desc: "我的第一个项目的简要介绍。",
            project2Title: "项目二",
            project2Desc: "我的第二个项目的简要介绍。",
            experienceTitle: "工作经历",
            job1Title: "微软软件开发工程师 II",
            job1Date: "2024年9月 - 至今",
            job1Location: "中国上海",
            job1Team: "Microsoft Exchange Server | 邮件服务团队",
            job1Resp1: "负责邮箱规则模块，包括从Win32到Web的功能对齐、快速事件响应以及后端监控指标的设计与实现。",
            job1Resp2: "参与Exchange Server架构的现代化改造，为旧系统的演进贡献力量，使其成为一个更高效、更易于维护的平台。",
            job1Skills: ".NET框架 · 全栈开发",
            job2Title: "微软软件开发工程师",
            job2Date: "2021年7月 - 2024年9月",
            job2Location: "中国上海",
            job2Team: "Microsoft Purview (曾用名 Azure Purview)",
            job2Resp1: "主导从Azure Purview到Microsoft Purview的元数据迁移，重点关注数据库流量管理、监控指标和主动警报，确保平稳可靠的过渡。",
            job2Resp2: "推动Purview-Egeria连接器的开发，实现外部元数据平台（如Egeria）与Microsoft Purview的集成。",
            job2Resp3: "积极参与DevOps运维，支持CI/CD流水线并维护团队内的系统稳定性。",
            job2Skills: "Java · 元数据管理 · DevOps",
            articlesTitle: "我的文章",
            contactTitle: "联系我",
            contactText: "你可以通过 kelukin@gmail.com 与我联系",
            linkedinLink: "领英",
            footerText: "&copy; 2025 刘笑尘"
        }
    };

    // Function to detect browser language preference
    const detectBrowserLanguage = () => {
        // Get the browser's language preference
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        
        // Check if the browser language starts with 'zh' (Chinese variants)
        if (browserLang.toLowerCase().startsWith('zh')) {
            return 'zh';
        }
        
        // Default to English for all other languages
        return 'en';
    };

    let currentLanguage = detectBrowserLanguage();

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key]) {
                elem.innerHTML = translations[lang][key];
            }
        });
    };

    const setLanguage = (lang) => {
        currentLanguage = lang;
        applyTranslations(lang);
        loadArticles(lang);
        
        // Update button states
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    };

    const loadArticles = (lang) => {
        fetch('articles.json')
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                const articlesList = document.getElementById('articles-list');
                if (!articlesList) return; // Guard clause
                articlesList.innerHTML = '';
                articles.forEach(article => {
                    const articleEl = document.createElement('div');
                    articleEl.className = 'article-card';
                    const title = lang === 'zh' ? article.title_zh : article.title_en;
                    const summary = lang === 'zh' ? article.summary_zh : article.summary_en;
                    articleEl.innerHTML = `
                        <a href="article.html?id=${article.id}&lang=${lang}">
                            <h3>${title}</h3>
                            <p>${summary}</p>
                            <p><small>${article.date}</small></p>
                        </a>
                    `;
                    articlesList.appendChild(articleEl);
                });
            });
    };

    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-zh').addEventListener('click', () => setLanguage('zh'));

    // Initial load with detected language
    setLanguage(currentLanguage);
});
