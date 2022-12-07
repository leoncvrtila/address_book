<template>
  <q-table
    :rows="contacts"
    :columns="columns"
    row-key="name"
    binary-state-sort
    v-if="!$q.screen.xs && !$q.screen.sm"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="firstName" :props="props">{{ props.row.firstName }}</q-td>
        <q-td key="lastName" :props="props">{{ props.row.lastName }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        <q-td key="country" :props="props">{{ props.row.country }}</q-td>
        <q-td key="options" :props="props" v-if="showActions">
          <q-btn
            color="blue"
            icon="edit"
            @click="$emit('edit', props.row)"
            size="sm"
            no-caps
            round
          />
          <q-btn
            color="red"
            icon="delete"
            @click="$emit('delete', props.row.id)"
            size="sm"
            class="q-mr-sm q-ml-sm"
            no-caps
            round
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-table
    :rows="contacts"
    :columns="columns"
    row-key="name"
    binary-state-sort
    v-if="$q.screen.xs || $q.screen.sm"
    grid
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card>
          <q-card-section :class="cardSectionClass">
            <label>First name</label>
            <br />
            {{ props.row.firstName }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Last name</label>
            <br />
            {{ props.row.lastName }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Email</label>
            <br />
            {{ props.row.email }}
          </q-card-section>
          <q-card-section :class="cardSectionClass">
            <label>Country</label>
            <br />
            {{ props.row.country }}
          </q-card-section>
          <q-card-section :class="cardSectionActionsClass" v-if="showActions">
            <q-card-actions class="flex justify-center q-pa-none">
              <q-btn
                color="blue"
                icon="edit"
                @click="$emit('edit', props.row)"
                size="sm"
                no-caps
                round
              />
              <q-btn
                color="red"
                icon="delete"
                @click="$emit('delete', props.row.id)"
                size="sm"
                no-caps
                round
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    showActions: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['edit', 'delete', 'history'],
  setup() {
    return {
      cardSectionClass: 'q-pl-md q-pb-none q-pt-sm text-caption',
      cardSectionActionsClass: 'q-pl-md q-pb-md q-pt-sm text-caption',
    };
  },
};
</script>

<style scoped>
label {
  color: #696969;
}
</style>
