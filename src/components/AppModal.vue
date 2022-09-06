<script setup>
import { ref, watch, computed } from 'vue';

const dialog = ref();

const emit = defineEmits(['item-clicked', 'update:modelValue']);
const handleClick = () => emit('item-clicked');

const props = defineProps({
    title: {
        type: String,
        default: 'this is the title',
    },
    visible: {
        type: Boolean,
        default: false,
    },
});

const inputVal = computed({
    get: () => props.title,
    set: (value) => emit('update:modelValue', value),
});

watch(() => props.visible, (selection) => {
    dialog.value = selection;
});

</script>

<template>

    <v-dialog
        v-model="dialog"
        content-class="v-dialog--custom"
    >
        <v-card>
            <v-card-text>
                <v-text-field
                    outlined
                    v-model="inputVal"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="handleClick()">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<style>
.v-dialog--custom {
  width: 100%;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .v-dialog--custom {
    width: 25%;
  }
}
</style>
