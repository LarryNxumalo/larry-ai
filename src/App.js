import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';

//data
const alanKey = '79a503e22a811db5e1980c3f389cab3d2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    //State field
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    //methods
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                   setNewsArticles(articles);
                   setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText(`(Please try that again.| I only have 20 articles showing | Try something lower than 20 or greater than Zero)`)
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText(`(Doing just that | Opening...| Doing that | In a sec | Cool | Opening right away)`);
                    }
                }
            }

        })
    }, [])
    return (
        <div>
            <h1>Phepha Ndaba</h1>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;