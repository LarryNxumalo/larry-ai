import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

//data
const alanKey = '79a503e22a811db5e1980c3f389cab3d2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
//methods
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles }) => {
                if(command === 'newHeadlines'){
                    console.log(articles);
                }
            }

        })
    }, [])
    return (
        <div>
            <h1>Larry AI news Application</h1>
        </div>
    )
}

export default App;