export default {
    install: (app) => {
        // eslint-disable-next-line no-param-reassign
        app.config.globalProperties.$manatal = {
            showBadgeColour(time) {
                if (time.split(':')[0] <= 16) {
                    return 'green';
                }
                return 'red';
            },
        };
    },
};
