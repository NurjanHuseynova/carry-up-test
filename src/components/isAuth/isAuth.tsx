'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const isAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const accessToken = localStorage.getItem("accessToken");
            const user = localStorage.getItem("user");

            if (!accessToken || !user) {
                router.push("/");
            } else {
                setIsAuthorized(true); // Allow access
            }
        }, [router]);

        if (!isAuthorized) {
            return null; // You can replace this with your loader component
        }

        return <WrappedComponent {...props} />;
    };
};

export default isAuth;
