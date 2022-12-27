<template>
    <div :class="$style.loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'TheLoader',
};
</script>

<style lang="scss" module>
.loader {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;

    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 15px;
        height: 15px;
        border: 2px solid $blue;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $blue transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
