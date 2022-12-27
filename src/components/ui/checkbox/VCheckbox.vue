<template>
    <label
        ref="label"
        :class="['v-checkbox', classList]"
        role="checkbox"
        :aria-checked="isChecked"
        :aria-disabled="disabled"
    >
        <span class="v-checkbox__body">
            <span class="v-checkbox__input">
                <input
                    v-model="computedValue"
                    class="v-checkbox__native"
                    type="checkbox"
                    :name="name"
                    :value="trueValue"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    :disabled="disabled"
                    @keydown.enter.stop.prevent="$refs.label.click()"
                    @focus="onFocus"
                    @blur="onBlur"
                />
            </span>

            <span
                v-if="$slots.default"
                class="v-checkbox__label"
            >
                <slot></slot>
            </span>
        </span>
    </label>
</template>

<script>
export default {
    name: 'TheCheckbox',

    props: {
        hintText: {
            type: String,
            default: '',
        },

        /** Имя, которое используется при отправке формы */
        name: {
            type: String,
            default: '',
        },

        /** Текущее значение чекбокса */
        value: {
            type: [Array, String, Number, Boolean],
            required: true,
        },

        /**  Значение, которое используется при отправке формы, а также передается в value при активации чекбокса */
        trueValue: {
            type: [String, Number, Boolean],
            default: true,
        },

        falseValue: {
            type: [String, Number, Boolean],
            default: '',
        },

        /**  Определяет классы, которые будут модифицировать размер */
        size: {
            type: String,
            default: 'medium',
        },

        /**  Определяет классы, которые будут модифицировать цвет */
        color: {
            type: String,
            default: 'default',
        },

        /** Отключает взаимодействие с чекбоксом */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isFocused: false,
        };
    },

    computed: {
        classList() {
            return [
                `v-checkbox--${this.color}`,
                `v-checkbox--${this.size}`,
                {
                    'is-disabled': this.disabled,
                    'is-checked': this.isChecked,
                },
            ];
        },

        computedValue: {
            get() {
                return this.value;
            },

            set(value) {
                this.$emit('on-input', value);
            },
        },

        isChecked() {
            if (Array.isArray(this.value)) {
                return this.value.indexOf(this.trueValue) > -1;
            }
            return this.value === this.trueValue;
        },
    },

    methods: {
        onFocus() {
            this.isFocused = true;
        },

        onBlur() {
            this.isFocused = false;
        },
    },
};
</script>

<style lang="scss">
.v-checkbox {
    display: flex;
    outline: none;
    line-height: 0;
    user-select: none;
    cursor: pointer;

    /* Colors */
    &--default {
        @include hover {
            .v-checkbox__input {
                border-color: $blue;
                background-color: $base-0;
            }
        }

        .v-checkbox__label {
            color: $base-500;
        }

        .v-checkbox__input {
            border-color: $base-300;
            background-color: $base-0;
        }

        &:focus,
        &.is-focused {
            .v-checkbox__input {
                border-color: $blue;
                background-color: $base-0;
            }
        }

        &.is-checked {
            .v-checkbox__input {
                border-color: $blue;
                box-shadow: 0 0 0 0.3rem rgba($blue, 1) inset;
            }
        }
    }
    /* End Colors */

    /* Sizes */
    &--medium {
        .v-checkbox__label {
            margin-left: 1.7rem;
            font-size: 1.6rem;
        }

        .v-checkbox__input {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    &--small {
        .v-checkbox__input {
            width: 1.2rem;
            height: 1.2rem;
        }
    }
    /* End Sizes */

    /* Modificators */
    &.is-disabled {
        pointer-events: none;

        .v-checkbox__input {
            border-color: $base-300;
            box-shadow: 0 0 0 0.2rem rgba($base-300, 1) inset;
        }

        .v-checkbox__label {
            color: $base-300;
        }
    }
    /* End Modificators */

    &__body {
        position: relative;
        display: inline-flex;
        align-items: center;
        transition: all $default-color-transition;
    }

    &__input {
        position: relative;
        flex-shrink: 0;
        margin-bottom: 0.2rem;
        border: 1px solid;
        transition: all 0.2s;
    }

    &__native {
        display: none;
    }

    &__label {
        white-space: nowrap;
        transition: color $default-color-transition;
    }
}
</style>
