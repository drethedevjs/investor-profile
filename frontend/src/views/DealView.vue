<script lang="ts" setup>
import BusinessFormData from "@/classes/BusinessFormData";
import Outcome from "@/classes/Outcome";
import BusinessRecordModal from "@/components/BusinessRecordModal.vue";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import businessService from "@/services/businessService";
import moment from "moment";
import { Field } from "vee-validate";
import { inject, onMounted, ref } from "vue";

let filteredBusinessRecords = ref<IBusinessRecord[]>([]);
const masterBusinessRecords: IBusinessRecord[] = [];
let outcomes: string[] = [];
let businessTypes: string[] = [];
const selectedBusiness = ref<IBusinessRecord | null>(new BusinessFormData());
const showErrorToast: ((msg: string) => void) | undefined = inject("showErrorToast");

// selectedBusiness.value = new BusinessFormData()

onMounted(async () => {
  try {
    const { businessRecords, callOutcomes, types } = await businessService.getListData();
    filteredBusinessRecords.value = businessRecords;
    masterBusinessRecords.push(...businessRecords);
    outcomes = callOutcomes.map((o) => o.name);
    businessTypes = types.map((t) => t.name);
  } catch (error) {
    console.error(error);
    if (error) showErrorToast!(error.toString());
  }
});

const openBusinessModal = (record: IBusinessRecord) => {
  const modal = document.getElementById("business_form_data") as HTMLDialogElement;
  selectedBusiness.value = { ...record };
  modal.showModal();
};

const search = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.value.length !== 0 && input.value.length < 4) return;

  if (!input.value) filteredBusinessRecords.value = masterBusinessRecords;

  filteredBusinessRecords.value = masterBusinessRecords.filter((br) =>
    br.business.toLowerCase().includes(input.value.toLowerCase()),
  );
};
</script>

<template>
  <h1 class="text-center my-10">Business Logs</h1>
  <div class="w-1/2 mx-auto my-10 flex flex-col">
    <label for="search">Search</label>
    <Field
      id="search"
      name="search"
      label="Search"
      placeholder="Search by business name..."
      @input="search"
    />
  </div>

  <div class="border-2 w-11/12 overflow-scroll mx-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Business</th>
          <th>Type</th>
          <th>Owner</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Parcel</th>
          <th>Address</th>
          <th>Last Contact Date</th>
          <th>Outcome</th>
          <th>Notes</th>
          <th>On Market?</th>
          <th>Price</th>
          <th>Cash Flow</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in filteredBusinessRecords"
          :key="record.business"
          :class="{
            'bg-green-200 font-semibold': record.outcome?.name == Outcome.Interested,
            'bg-red-200 font-semibold': record.outcome?.name === Outcome.NotInterested,
          }"
          @click="() => openBusinessModal(record)"
        >
          <td class="font-semibold">{{ record.business }}</td>
          <td>{{ record.type.name }}</td>
          <td class="min-w-40">{{ record.owner }}</td>
          <td class="min-w-40">
            <a class="link" :href="'tel:' + record.phone">{{ record.phone }}</a>
          </td>
          <td>
            <a class="link" :href="'mailto:' + record.email">{{ record.email }}</a>
          </td>
          <td class="min-w-40">{{ record.parcel }}</td>
          <td class="min-w-64" :class="record.address != '' ? '' : 'bg-slate-400-500'">
            {{ record.address != "" ? record.address : "N/A" }}
          </td>
          <td
            :class="
              moment(record.lastContactDate).fromNow().includes('days') &&
              record.outcome?.name !== Outcome.NotInterested
                ? 'bg-neutral text-white font-semibold'
                : ''
            "
          >
            <div
              class="inline-grid *:[grid-area:1/1]"
              v-if="
                moment(record.lastContactDate).fromNow().includes('days') &&
                record.outcome?.name !== Outcome.NotInterested
              "
            >
              <div class="status status-success animate-ping"></div>
              <div class="status status-success"></div>
            </div>

            {{ moment(record.lastContactDate).format("MM/DD/yyyy") }}
          </td>
          <td>{{ record.outcome?.name }}</td>
          <td class="min-w-96">{{ record.notes }}</td>
          <td :class="record.onMarket ? 'bg-secondary text-white' : ''">
            {{ record.onMarket ? "Yes" : "No" }}
          </td>
          <td>{{ record.price ?? "n/a" }}</td>
          <td>{{ record.cashFlow ?? "n/a" }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <BusinessRecordModal
    :outcomes="outcomes"
    :businessTypes="businessTypes"
    :businessRecord="selectedBusiness"
  />
</template>

<style scoped>
td {
  @apply border-2;
}
th {
  @apply border-x-2;
}
</style>
