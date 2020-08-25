import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

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
                    window.open(articles[number].url, '_blank');
                    // console.log('number');
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