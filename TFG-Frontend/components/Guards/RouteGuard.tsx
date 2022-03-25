import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function RouteGuard({ children }) {

    const [authorized, setAuthorized] = useState(false)
    const publicPaths: ()  => Array<string> = useCallback(() => { return ['/', '/register']; }, [])
    const routing = useRouter()

    useEffect((router: NextRouter = routing) => {
        const path: string = router.asPath.split('?')[0]

        function authCheck(router: NextRouter) {
    
            axios({
                method: 'get',
                url: '/api/user',
                data: {},
            }).then((response: any) => {
                if(response.status == 200){
                    document.cookie = `username=${response.data.USERNAME};`;
                    setAuthorized(true);
                    if(publicPaths().includes(path)) {
                        if(router) {
                            router.push({
                                pathname: '/home',
                                query: { returnUrl: router.asPath }
                            },'/home');
                        }
                    }
                }
            }, () => {
                setAuthorized(publicPaths().includes(path))
                
                if(!publicPaths().includes(path)) {
                    if(router){
                        router.push({
                            pathname: '/',
                            query: { returnUrl: router.asPath }
                        },'/');
                    }
                }
                
            });
            
        }

        // on initial load - run auth check 
        authCheck(routing);

        // Hide content if the page is not public
        const hideContent = () => setAuthorized(publicPaths().includes(path));

        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);   
        }
    }, [routing, publicPaths]);

    return (authorized && children);
}

export { RouteGuard };