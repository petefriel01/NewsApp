// Styles
import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#FF0000',
                    secondary: '#FFCDD2',
                },
            },
        },
    },
    // display: {
    //     mobileBreakpoint: 'sm',
    //     thresholds: {
    //         xs: 0,
    //         sm: 340,
    //         md: 540,
    //         lg: 800,
    //         xl: 1280,
    //     },
    // },
});
