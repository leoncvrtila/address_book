import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { Contact } from './entities/contact.model';

const useContactRepo = useRepo(Contact);

export const useContactService = defineStore('contact', {
  state: () => ({}),
  actions: {
    addContact(contact: any) {
      useContactRepo.save(contact);
    },
    updateContact(contact: any) {
      useContactRepo.save(contact);
    },
    deleteContact(contactId: string) {
      useContactRepo.destroy(contactId);
    },
  },
  getters: {
    contacts: (state) => {
      return useContactRepo.all();
    },
  },
});
