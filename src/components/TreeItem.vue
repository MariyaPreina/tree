<template>
    <li>
        <VAccordion :has-children="Boolean(item?.children?.length)">
            <template #title>
                <div :class="$style.title">
                    <a :href="link"
                       :class="$style.link"
                    >
                        {{ item.title }}
                        <span>({{ item.count }}, {{ counts.sum }})</span>
                    </a>
                    <VCheckbox :false-value="false"
                               :true-value="true"
                               :value="item.isChecked"
                               size="small"
                               :class="$style.checkbox"
                               @onInput="handleChangeCheckbox(item, $event)" />
                </div>
            </template>
            <ul :class="$style.list">
                <TreeItem
                    class="item"
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child" />
            </ul>
        </VAccordion>
    </li>
</template>

<script>
import { getCounters } from '@/assets/js/utils';
import {mapActions} from 'vuex';
import VAccordion from '@/components/ui/accordion/VAccordion';
import VCheckbox from '@/components/ui/checkbox/VCheckbox';

export default {
    name: 'TreeItem',

    components: {
        VAccordion,
        VCheckbox
    },

    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        link() {
            return `${process.env.VUE_APP_BASE_URL}${this.item.url}`;
        },

        counts() {
            return getCounters(this.item);
        }
    },

    methods: {
        ...mapActions(['handleCheckCategory']),

        handleChangeCheckbox(category, e) {
            this.handleCheckCategory({ category, isChecked: e });
        }
    }
};
</script>

<style lang="scss" module>
.title {
    display: flex;
    padding: 1rem 0;
    font-size: 1.6rem;
}

.list {
    margin-left: 2rem;
}

.link {
    transition: color $default-color-transition;

    @include hover {
        color: $base-400;
    }

}

.checkbox {
    margin-left: .7rem;
}
</style>
