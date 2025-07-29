import React, { useEffect, useState } from 'react'
import { WebContainer } from '@webcontainer/api';

// Call only once

export function useWebContainers() {
    const [webcontainer, setWebcontainer] = useState();
    async function main() {
        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance)
    }
     useEffect(() => {
        main();
    }, [])       //we are going to call webcontainers only when the page mounts     

    return webcontainer;
 
}


