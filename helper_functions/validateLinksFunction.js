import { expect } from "@playwright/test";

// Callback function for validating if the links in an array of objects of posts from a site are all working properly
const validateLinks = async (articles, page) => {
    for (let article of articles) {
        try {
            // Saves the response received after testing the link 
            const res = await page.request.get(article.link);
            // Checks the responses from all the links tried to see if a good status is returned
            expect.soft(res, `${article.link} functions perfectly`).toBeOK();
            // Logs the status code of the link returned to the console if the status code was not in the 200 range
            if (!res.ok()) {
                console.log(`Site "${article.link}" returned Status: ${res.status()}`);
            };
            // Catch block for if an error is returned back from the site request
        } catch (e) {
            // Logs the link that returned an error to the terminal
            console.log(`Site "${article.link}" timed out or failed!`);
        };
    };
};

export default validateLinks;