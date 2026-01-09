import { test, expect } from "@playwright/test";
import validateLinks from "../helper_functions/validateLinksFunction";

// Choose the exact amount of articles you want validated
const articleCount = 100;

test(`Validating first ${articleCount} Hacker Articles`, async ({ page }) => {

    test.setTimeout(0);

    await page.goto("https://news.ycombinator.com/newest");

    // Verifies successful page navigation
    await expect(page,
        "Navigated to Hacker News site successfully").toHaveURL("https://news.ycombinator.com/newest");

    const allArticles = [];

    // Loop that goes page by page on the Hacker site collecting an array of articles until the array has the amount of articles requested
    while (allArticles.length < articleCount) {
        // Asserts that the pages that are supposed to contain the most recent Hacker articles are the ones being tested
        await expect(page).toHaveTitle("New Links | Hacker News");

        // Constructs objects containing each article's ID # and the link to the site containing the article
        const articles = await page.locator('tr.athing').evaluateAll(nodes => nodes.map(n => ({
            id: Number(n.id),
            link: n.querySelector('span.titleline > a').href
        })));

        allArticles.push(...articles);

        await page.locator('a:text-is("More")').click();
    }

    const testingArticles = allArticles.slice(0, articleCount);

    // Makes sure that there is now an array of just exactly the amount of articles wanting to be validated and that none of the site ID numbers were duplicated
    expect(new Set(testingArticles
        .map(a => a.id)).size,
        "Array has exact amount of articles requested with no duplicate IDs").toBe(articleCount);

    const sortedArticles = testingArticles.toSorted((a, b) => b.id - a.id);

    // Validates that the articles collected were already in order on the site from greatest to least ID number (newest to oldest article)
    expect(testingArticles,
        "Articles on Hacker News are already in order from newest to oldest").toEqual(sortedArticles);

    // Invokes callback function to validate that all the links for each article collected are working properly
    await validateLinks(testingArticles, page);
});