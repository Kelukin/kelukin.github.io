
# Reflections on the Age of Agents

## Background
A few weeks ago, I was still oblivious to the transformative impact Agents are having on the tech industry. My understanding of AI programming tools was stuck at last year’s level: simple autocompletion, not-so-smart unit test generation. Social media was flooded with AI-themed videos, most of which felt like sponsored content from model vendors, with everyone excitedly proclaiming a new industrial revolution. I was skeptical, convinced that these tools merely summarized text or performed straightforward analysis when given enough context, but couldn’t achieve the kind of synthesis that humans do—connecting concepts across unrelated domains. Plus, I didn’t want to pay for work tools out of pocket, and using Cursor Coding required a subscription. My codebase at work is massive (about 70GB), and I’d heard that current tools don’t handle such large projects well, so I wasn’t eager to try them.

The turning point came when I had to refactor some code to fix an old bug. Another team insisted we add tests, even though we’d only just inherited the files and they’d never been covered by tests before. My manager, Charles, suggested trying Visual Studio Code’s Copilot. I didn’t expect much, but I simply instructed it: “Make it easier to write unit test.” To my surprise, it broke down a long function into smaller units, generated test files, and documented the changes. After an afternoon of iterative interaction, the code quality was ready for review. In hindsight, code refactoring is a lot like summarizing and polishing an article—something large models excel at when the context is self-contained.

## The Vision of Visual Studio Code and GitHub Copilot Agents
Visual Studio Code is a popular editor among developers, backed by a huge community. Developers contribute plugins for various scenarios, seeking little more than reputation in the community, while GitHub and Microsoft benefit from a self-sustaining ecosystem.

GitHub Copilot is Microsoft’s first-party plugin for VS Code. It recently introduced Agent mode and a built-in local MCP server. Agent mode allows large models to access more tools: they can actively fetch resources for better context or call external programs to do what language alone cannot. Cleverly, plugin developers are invited to participate—plugins become tools for the model, and developers help build a smarter ecosystem. This is a unique advantage for Copilot compared to competitors like Cursor: community-driven innovation.

Today, if you ask GitHub Copilot to “build a meditation website that generates a five-minute article every day for background audio,” it will first create a design document, suggest deploying on Azure App Service, use Azure Cosmos DB for storage, Azure AI for text generation, and Azure Communication Service for notifications. It even generates Azure deployment scripts—if you buy the resources, you can deploy in one step. This is possible because Copilot can access Azure’s design docs and config samples.

This hints at a future where personalized software is cheaper and more scalable. Agents are influencing users’ tech choices, nudging them toward Azure resources.

## Changes in the Labor Market
It’s time to reconsider how much of our daily work is about gathering enough context and making straightforward decisions. This is the norm for knowledge workers—what you might call “white-collar bricklaying.” With large models now able to actively gather context, the irreplaceability of white-collar workers is up for debate, perhaps hinging on explainability and accountability.

After discussing with Sudong, we wondered if the rise of large models might ease China’s “35-year-old career crisis,” since senior workers have more context and better tools boost productivity. But maybe companies will just avoid both the inexperienced and the older workers. Sudong joked: “Could it end up that they don’t want the young or the old?”

## The Future?
An article from The Economist, [The Economics of Superintelligence](https://www.economist.com/leaders/2025/07/24/the-economics-of-superintelligence?giftId=88d1bf69-caf0-4cb7-8fb0-351d3af0ee15&utm_campaign=gifted_article), predicts that business owners will wonder why they should spend more on human workers instead of AI tools. Those whose jobs can’t be automated, or who can compete directly with AI, will earn much more, while others may see their incomes fall. Wealth will concentrate even faster among the rich, increasing social instability.

For the software industry, big platform companies will become even more competitive. Even though AI will create lots of software, maintenance and security concerns mean most will end up hosted on cloud platforms. Cloud customers will include not just developers and businesses, but ordinary consumers. We’ll get bills from cloud companies just like we do for utilities.

Open source developers may find they’re helping big companies build better models that could eventually replace them—their knowledge becomes tools for models to access broader domains.

Individually, we can build our own databases or “knowledge bases,” which will be as valuable as privacy is today. Everyone can choose to share or keep theirs private, hoping for a competitive edge in an increasingly tough society.

Will public or community knowledge sharing become more closed off?
