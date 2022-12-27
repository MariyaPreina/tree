<template>
    <div :class="$style.Page">
        <div :class="$style.checkboxWrapper">
            <VCheckbox
                :false-value="0"
                :true-value="1"
                :value="allowEmpty"
                @onInput="handleChangeCheckbox">
                Отображать пустые рубрики
            </VCheckbox>
            <transition name="fade" mode="out-in">
                <VLoader v-if="status === 'loading'"
                         :class="$style.loader" />
            </transition>
        </div>

        <p :class="$style.count"><span>counts:</span> {{getSumCheckedCategories}}</p>

        <ul :class="$style.list">
            <TreeItem
                v-for="item in categories"
                :key="item.id"
                :item="item" />
        </ul>
    </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import TreeItem from '@/components/TreeItem';
import VCheckbox from '@/components/ui/checkbox/VCheckbox';
import VLoader from '@/components/ui/loader/VLoader';

export default {
    name: 'App',

    components: {
        TreeItem,
        VCheckbox,
        VLoader
    },

    data() {
        return {
            allowEmpty: 0,
        };
    },

    created() {
        document.title = `${process.env.VUE_APP_TITLE}`;
    },

    mounted() {
        this.fetchCategories(this.allowEmpty);
    },

    computed: {
        ...mapState([
            'categories',
            'status',
        ]),

        ...mapGetters([
            'getSumCheckedCategories'
        ]),
    },

    methods: {
        ...mapActions(['fetchCategories']),

        handleChangeCheckbox(e) {
            this.allowEmpty = e;
            this.fetchCategories(this.allowEmpty);
        },
    },
};
</script>

<style lang="scss" module>
.Page {
    padding: 5rem 3rem;
}

.checkboxWrapper {
    position: relative;
    display: inline-block;
}

.loader {
    position: absolute;
    left: calc(100% + 1rem);
    top: 50%;
    transform: translateY(-50%);
}

.count {
    margin-top: 1rem;

    & span {
        font-weight: 600;
    }
}

.list {
    margin-top: 2rem;
}
</style>
