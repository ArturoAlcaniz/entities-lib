import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function RouteGuard({ children }) {

    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
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
        const publicPaths = ['/', '/register']
        const path = url.split('?')[0];

        axios({
            method: 'get',
            url: '/api/user',
            data: {},
        }).then((response) => {
            if(response.status == 200){
                setAuthorized(true);
                if(publicPaths.includes(path)) {
                    router.push({
                        pathname: '/home',
                        query: { returnUrl: router.asPath }
                    },'/home');
                }
            }
        }, (error) => {
            if(!publicPaths.includes(path)) {
                setAuthorized(false);
                router.push({
                    pathname: '/',
                    query: { returnUrl: router.asPath }
                },'/');
            }else{
                setAuthorized(true)
            }
        });
        
    }
    return (authorized && children);
}

export { RouteGuard };