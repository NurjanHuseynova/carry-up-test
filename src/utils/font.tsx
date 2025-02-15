import localFont from "next/font/local";

const carryFont = localFont({
    variable : "--carryUp",
    fallback : ['system-ui'],
    src: [
        {
            path: '../assets/fonts/TTHoves-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/TTHoves-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/TTHoves-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/TTHoves-DemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/TTHoves-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
})

export {carryFont};