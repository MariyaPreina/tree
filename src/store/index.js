import { createStore } from 'vuex';
import axios from 'axios';

import { checkCategory, initAllCategories, sumAllCheckedCategories } from '@/assets/js/utils';

export default createStore({
    state: () => ({
        status: '',
        categories: [],
    }),

    getters: {
        getSumCheckedCategories(state) {
            return sumAllCheckedCategories(state.categories);
        }
    },

    actions: {
        async fetchCategories({ commit }, payload) {
            try {
                commit('SET_STATUS', 'loading');
                const res = await axios.get(
                    `${process.env.VUE_APP_BASE_URL}/yindex.php/v3/event/rubrics?allowEmpty=${payload}`
                );
                initAllCategories(res.data);
                commit('SET_ALL_CATEGORIES', res.data);
                commit('SET_STATUS', 'success');
            } catch (e) {
                commit('SET_STATUS', 'error');
                console.warn('[VUEX/fetchCategories]: ', e);
            }
        },

        handleCheckCategory(_, payload) {
            checkCategory(payload.category, payload.isChecked);
        }
    },

    mutations: {
        SET_ALL_CATEGORIES(state, payload) {
            state.categories = payload;
        },

        SET_STATUS(state, payload) {
            state.status = payload;
        },
    },
});
