import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function RouteGuard({ children }) {

    const [authorized, setAuthorized] = useState(false)
    const publicPaths: ()  => Array<string> = useCallback(() => { return ['/', '/login', '/register']; }, [])
    const adminPaths: ()  => Array<string> = useCallback(() => { return ['/management']; }, [])
    const routing = useRouter()

    useEffect((router: NextRouter = routing) => {
        const path: string = router.asPath.split('?')[0]

        function authCheck() {
    
            axios({
                method: 'get',
                url: '/api/sessions/user',
                data: {},
            }).then((response: any) => {
                if(response.status == 200){
                    document.cookie = `username=${response.data.USERNAME};`;
                    document.cookie = `admin=${response.data.ROL === "ADMIN"}`;
                    document.cookie = `coins=${response.data.COINS};`;
                    
                    if((publicPaths().includes(path) || (adminPaths().includes(path) && response.data.ROL != "ADMIN")) && router) {
                        setAuthorized(false);
                        router.push({
                            pathname: '/buy',
                            query: { returnUrl: router.asPath }
                        },'/buy');
                    }else{
                        setAuthorized(true);
                    }
                }
            }, () => {
                setAuthorized(publicPaths().includes(path))
                
                if(!publicPaths().includes(path) && router) {
                    router.push({
                        pathname: '/',
                        query: { returnUrl: router.asPath }
                    },'/');
                }
                
            });
            
        }

        // on initial load - run auth check 
        authCheck();

        // Hide content if the page is not public
        const hideContent = () => setAuthorized(false);

        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);   
        }
    }, [routing, adminPaths, publicPaths]);

    return (authorized && children);
}

export { RouteGuard };