/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            'banner': "url('/splash.jpg')",
            'bottle': "url('/bottle.jpg')",
         },
         backgroud:{
            'gradient1': 'linear-gradient(to left, transparent 50%, lightblue 50%) right',
         },
         backgroundSize: {
            '200': '200%',
         },     
         minHeight: {
            'screen-minus-nav': "calc(100vh - var(--navbar-height))"
         },
         height: {
            'screen-minus-nav': "calc(100vh - var(--navbar-height))"
         },
         fontFamily:{
            wdc: ["var(--font-roboto)", "sans-serif"],
            def: ['Montserrat', 'sans-serif'],
            def2: ['Lato', 'sans-serif'],
            def3: ['Poppins', 'sans-serif']

         },
         colors:{
            'white': '#F5F5DC'
         },
         keyframes:{
            SlideIn: {            
               "0%": {transform: 'translateX(100%)'},
               "100%": {transform: 'translateX(0%)'}
            },
            SlideOff: {
               "0%": {transform: 'translateX(0%)'},
               "99%": {transform: 'translateX(-100%)'},
               "100%": {display: 'none'}
            },
            SlideInOpposite: {
               "0%": {transform: 'translateX(-100%)'},
               "100%": {transform: 'translateX(0%)'}
            },
            SlideInFromTop: {
               "0%": {transform: 'translateY(-10%)', opacity: 0},
               "100%": {transform: 'translateY(0%)', opacity: 1}
            },
            SlideInToTop: {
               "0%": {transform: 'translateY(0%)', opacity: 1},
               "100%": {transform: 'translateY(-10%)', opacity: 0}
            },
         },
         animation: {
            'aside-slide-in': 'SlideIn 0.5s ease-in-out',
            'aside-slide-in-opposite': 'SlideInOpposite 0.5s ease-in-out',
            'aside-slide-off': 'SlideOff 0.5s ease-in-out',
            'slide-in-from-top': 'SlideInFromTop 0.5s ease-in-out',
            'slide-in-to-top': 'SlideInToTop 0.5s ease-in-out',
         }
      },
   },
   plugins: [],
}
