<template>
    <div :class="$style.VAccordion">
        <div :class="$style.head">
            <slot v-if="$slots.title"
                  name="title"></slot>
            <button v-if="hasChildren"
                    @click="handleClick"
                    :class="$style.toggler"
            >
                <span :class="[$style.togglerText, {[$style._open]: isContentOpened}]">&#9662;</span>
                <span :class="$style.hint">{{ isContentOpened ? 'свернуть' : 'развернуть'}}</span>
            </button>
        </div>
        <div ref="content"
             :class="$style.content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VAccordion',

        props: {
          hasChildren: {
              type: Boolean,
              default: false,
          }
        },

        data() {
            return {
                resizeObserver: null,
                isContentOpened: false,
            };
        },

        watch: {
            isContentOpened(newValue) {
                if (newValue) {
                    this.$refs.content.style.maxHeight = this.$refs.content.scrollHeight + 'px';
                } else {
                    this.$refs.content.style.maxHeight = null;
                }
            }
        },

        mounted() {
            this.resizeObserver = new ResizeObserver(this.handleResizeObserver);
            if (this.$refs.content) {
                this.resizeObserver.observe(this.$refs.content);
            }

            if (this.value) {
                this.$refs.content.style.maxHeight = this.$refs.content.scrollHeight + 'px';
            }
        },

        beforeUnmount() {
            if (this.$refs.content) {
                this.resizeObserver.observe(this.$refs.content);
            }
        },

        methods: {
            handleClick() {
                this.isContentOpened = !this.isContentOpened;
            },

            handleResizeObserver() {
                if (this.$refs.content && this.$refs.content.scrollHeight) {
                    this.$refs.content.style.maxHeight = parseFloat(this.$refs.content.style.maxHeight) + this.$refs.content.scrollHeight + 'px';
                }
            },
        }
    };
</script>

<style lang="scss" module>
.VAccordion {
    //
}

.head {
    display: flex;
    align-items: center;
}

.content {
    overflow: hidden;
    max-height: 0;
    transition: max-height $default-transition;
}

.toggler {
    position: relative;
    margin-left: 2rem;
    width: 2rem;
    height: 2rem;
    border-radius: .5rem;
    background-color: $base-200;
    transition: background-color $default-color-transition;
    cursor: pointer;

    @include hover {
        background-color: $base-350;

        .hint {
            display: block;
        }
    }
}

.togglerText {
    display: block;
    transition: transform $default-transition;

    &._open {
        transform: rotate(180deg);
    }
}

.hint {
    display: none;
    position: absolute;
    left: calc(100% + 1rem);
    top: 50%;
    font-size: 1rem;
    border-radius: .2rem;
    transform: translateY(-50%);
    animation: hide .3s linear;
    animation-fill-mode: forwards;
}

@keyframes hide {
    0% {
        display: none;
        opacity: 0;
    }
    99% {
        display: block;
    }
    100% {
        display: block;
        opacity: 1;
    }
}
</style>
