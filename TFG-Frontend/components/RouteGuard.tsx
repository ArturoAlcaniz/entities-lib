import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function RouteGuard({ children }) {

    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const publicPaths = ['/', '/register']
    const path = router.asPath.split('?')[0];

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // Hide content if the page is not public
        const hideContent = () => setAuthorized(publicPaths.includes(path));

        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);   
        }
    }, []);

    function authCheck(url: string) {
        const path = url.split('?')[0];

        axios({
            method: 'get',
            url: '/api/user',
            data: {},
        }).then((response: any) => {
            if(response.status == 200){
                document.cookie = `username=${response.data.USERNAME};`;
                setAuthorized(true);
                if(publicPaths.includes(path)) {
                    router.push({
                        pathname: '/home',
                        query: { returnUrl: router.asPath }
                    },'/home');
                }
            }
        }, (error) => {
            setAuthorized(publicPaths.includes(path))
            
            if(!publicPaths.includes(path)) {
                router.push({
                    pathname: '/',
                    query: { returnUrl: router.asPath }
                },'/');
            }
            
        });
        
    }
    return (authorized && children);
}

export { RouteGuard };