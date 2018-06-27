<template>
    <div class="app__title" :style="{borderBottomColor: border ? '#e8eaee' : 'transparent', marginBottom: margin ? '0.34rem' : 0}">
        <div class="app__title-left">
            <slot name="left"></slot>
        </div>
        <div class="app__title-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            border: {
                default: true
            },
            margin: {
                default: true
            }
        }
    };
</script>
