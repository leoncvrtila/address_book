<template>
  <q-layout
    view="lHr lpr lFr"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    container
  >
    <q-header bcontacted class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="people" size="md" />
          </q-avatar>
          {{ isNew ? 'Add New Contact' : 'Edit Contact' }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-form class="q-gutter-sm" @submit.prevent="handleSubmit">
          <q-input
            filled
            v-model="v$.firstName.$model"
            label="First name *"
            class="q-py-md"
            :error="v$.firstName.$error"
            :error-message="v$.firstName.$errors[0]?.$message"
          />

          <q-input
            filled
            v-model="v$.lastName.$model"
            label="Last name *"
            class="q-py-md"
            :error="v$.lastName.$error"
            :error-message="v$.lastName.$errors[0]?.$message"
          />

          <q-input
            filled
            v-model="v$.email.$model"
            label="Email *"
            class="q-py-md"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
          />

          <q-select
            v-model="v$.country.$model"
            :options="countries"
            label="Country *"
            no-caps
            option-value="name"
            option-label="name"
            emit-value
            map-options
            filled
            :error="v$.country.$error"
            :error-message="v$.country.$errors[0]?.$message"
            class="q-py-md"
          />
        </q-form>
      </q-page>
    </q-page-container>

    <q-footer :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'" bcontacted>
      <q-toolbar>
        <q-btn
          type="button"
          color="white"
          text-color="black"
          label="Cancel"
          @click="handleCancel"
          no-caps
        />

        <q-space />

        <q-btn
          color="primary"
          :label="isNew ? 'Create' : 'Update'"
          no-caps
          @click="handleSubmit"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { computed, PropType, defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { useContactFormManager } from 'src/managers/contact-form.manager';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  props: {
    contact: {
      type: Object as PropType<any>,
      default: () => ({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
      }),
    },

    isNew: {
      type: Boolean,
    },
    countries: {
      type: Array as PropType<any>,
      default: () => [],
    },
  },
  emits: ['submit', 'cancel'],
  setup(props: any, ctx: any) {
    const countries = computed(() => props.countries);

    const contact = computed(() => props.contact);

    const isNew = computed(() => props.isNew);

    const contactFormManager = useContactFormManager();

    const contactRules$ = computed(() => contactFormManager.contactRules());

    const v$ = useVuelidate(contactRules$, contact);

    async function handleSubmit() {
      const validator = v$.value;

      const isValid = await validator.$validate();

      if (!isValid) {
        return;
      }

      let newContact = {
        ...contact.value,
      };

      if (isNew.value) {
        newContact = {
          ...contact.value,
          id: uuidv4(),
        };
      }

      ctx.emit('submit', newContact);
    }

    function handleCancel() {
      ctx.emit('cancel');
    }

    function handleInputChange() {}

    return {
      contact: contact,
      handleInputChange,
      handleSubmit,
      handleCancel,
      v$,
      isNew,
      countries,
    };
  },
});
</script>
