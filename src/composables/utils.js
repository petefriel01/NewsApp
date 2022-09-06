const formatTitle = (title) => {
    let markup = '';
    if (title) {
        markup = title.split(' - ');
        markup = `${markup[0]}`.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().replace(/\s+/g, '-');
    }
    return markup;
};
export default formatTitle;
