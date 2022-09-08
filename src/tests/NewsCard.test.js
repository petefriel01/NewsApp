import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import { NewsCard } from '../components/NewsCard.vue';

test('mount component', async () => {
    expect(NewsCard).toBeTruthy();
    const wrapper = mount(NewsCard, {
        props: {
            source: 'abc-news',
        },
    });

    expect(wrapper.text()).toContain('abc-news');
});
