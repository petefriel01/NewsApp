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
});
