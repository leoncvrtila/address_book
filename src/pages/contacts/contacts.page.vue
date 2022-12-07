<template>
  <q-page padding class="">
    <q-card class="fit">
      <q-item class="bg-primary text-white q-mb-md">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="people" size="md" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h5"> Contacts </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            v-if="$q.screen.gt.xs"
            color="white"
            text-color="black"
            label="Create"
            icon="add"
            no-caps
            dense
            @click="handleCreateContact"
          />
        </q-item-section>
      </q-item>

      <q-card-section>
        <div class="">
          <contact-table
            :columns="columns"
            :contacts="contacts"
            :showActions="true"
            @edit="handleEditContact"
            @delete="handleDeleteContact"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-dialog :model-value="isDialogVisible" persistent>
      <contact-form
        :contact="contact"
        :isNew="isNew"
        :countries="countries"
        @cancel="handleCloseForm"
        @submit="handleSubmitContact"
      />
    </q-dialog>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="$q.screen.xs"
      @click="handleCreateContact"
    >
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import ContactTable from 'src/components/contacts/contacts-table.component.vue';
import ContactForm from 'src/components/contacts/contacts-form.component.vue';
import { useQuasar } from 'quasar';
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { TableColumns } from 'src/models/table-columns';
import countriesList from 'countries-list';
import { useContactService } from 'src/stores/contact.service';

const defaultContact = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  country: '',
};

export default defineComponent({
  components: {
    ContactTable,
    ContactForm,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const contactService = useContactService();

    const isNew = ref(false);

    const contacts = reactive<any>(contactService.contacts);

    const isDialogVisible = ref(false);

    const countriesListState = reactive<any>(countriesList.countries);

    const countries = Object.keys(countriesListState).map((key) => {
      return {
        id: countriesListState[key].phone,
        name: countriesListState[key].name,
      };
    }) as any;

    const contact = ref({ ...defaultContact }) as any;

    function handleCreateContact() {
      isNew.value = true;
      handleOpenForm();
    }

    function handleOpenForm() {
      isDialogVisible.value = true;
    }

    function handleCloseForm() {
      isDialogVisible.value = false;
      resetForm();
    }

    function resetForm() {
      contact.value = { ...defaultContact };
    }

    async function handleSubmitContact(newContact: any) {
      if (isNew.value) {
        await createContact(newContact);
      } else {
        await updateContact(newContact);
      }

      handleCloseForm();
    }

    async function handleOpenContact(contactId: string) {
      router.push({
        name: 'ContactBasicInformations',
        params: {
          contactId: contactId,
        },
      });
    }

    async function handleEditContact(contactToEdit: any) {
      isNew.value = false;

      contact.value = {
        ...contactToEdit,
      };

      handleOpenForm();
    }

    function createContact(newContact: any) {
      contactService.addContact(newContact);

      updateState();
    }

    async function updateContact(contact: any) {
      contactService.updateContact(contact);

      updateState();
    }

    function handleDeleteContact(contactId: string) {
      $q.dialog({
        title: 'Delete contact',
        message: 'Are you sure you want to delete this contact?',
        persistent: true,
        cancel: {
          color: 'grey',
          label: 'Cancel',
          tabindex: 0,
        },
        ok: {
          label: 'Delete',
          color: 'negative',
        },
      }).onOk(async () => {
        contactService.deleteContact(contactId);

        updateState();
      });
    }

    function updateState() {
      const newContacts = contactService.contacts;

      contacts.splice(0, contacts.length, ...newContacts);
    }

    return {
      columns: TableColumns,

      contacts,
      isDialogVisible,
      handleCreateContact,
      handleCloseForm,

      handleOpenContact,
      handleEditContact,
      handleDeleteContact,

      contact,
      updateContact,
      createContact,

      handleSubmitContact,

      isNew,
      countries,
    };
  },
});
</script>
