export default {
    install: (app) => {
        // eslint-disable-next-line no-param-reassign
        app.config.globalProperties.$manatal = {
            truncate(data) {
                let markup = '';
                if (data) {
                    markup = data.split('[');
                    markup = `${markup[0]}`;
                }
                return markup;
            },
            title(data) {
                let markup = '';
                if (data) {
                    markup = data.split(' - ');
                    markup = `${markup[0]}`.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().replace(/\s+/g, '-');
                }
                return markup;
            },
        };
    },
};
