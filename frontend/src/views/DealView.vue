<script lang="ts" setup>
import BusinessFormData from "@/classes/BusinessFormData";
import Outcome from "@/classes/Outcome";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import businessService from "@/services/businessService";
import { toTypedSchema } from "@vee-validate/yup";
import moment from "moment";
import { Field, useForm } from "vee-validate";
import { computed, inject, onBeforeMount, onMounted, reactive, ref } from "vue";
import { object, string } from "yup";

let filteredBusinessRecords = ref<IBusinessRecord[]>([]);
const masterBusinessRecords: IBusinessRecord[] = [];
let outcomes: string[] = [];
let businessTypes: string[] = [];
const selectedBusiness = ref<IBusinessRecord | null>(null);
const showErrorToast: ((msg: string) => void) | undefined = inject("showErrorToast");

onBeforeMount(() => {
  clearData();
});

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

const clearData = () => (selectedBusiness.value = new BusinessFormData());

const openBusinessModal = (record: IBusinessRecord) => {
  const modal = document.getElementById("business_form_data") as HTMLDialogElement;
  selectedBusiness.value = { ...record };
  modal.showModal();
};

const formData = reactive<BusinessFormData>(new BusinessFormData());
const showNotification = ref<boolean>(false);

const { resetForm, handleSubmit, isSubmitting, errors } = useForm<BusinessFormData>({
  validationSchema: toTypedSchema(
    object({
      business: string()
        .transform((x) => x.trim())
        .required("Name is required"),
      // email: string().email().required("Must be a valid email address."),
      // message: string().min(15, "Must be at least 15 characters."),
      // businessName: string()
      //   .transform((x) => x.trim())
      //   .required("Must be include business name."),
    }),
  ),
});

const submitForm = handleSubmit(async (values: BusinessFormData) => {
  try {
    // const response = await businessService.saveBusinessRecord(values);
    // if (!response.isSuccess) throw new Error(response.message);

    // showNotification.value = true;

    // setTimeout(() => {
    //   showNotification.value = false;
    // }, 5000);
    alert("boom goes the dynamite");
    resetForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.message ?? "There was an issue with sending the form. Please try again.");
  }
});

const formattedDate = computed(() =>
  selectedBusiness.value?.lastContactDate
    ? new Date(selectedBusiness.value.lastContactDate).toISOString().split("T")[0]
    : "",
);

const updateDate = (newValue: string) => {
  if (selectedBusiness.value) {
    selectedBusiness.value.lastContactDate = new Date(newValue);
  }
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

  <!-- Modal -->
  <dialog id="business_form_data" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="text-7xl font-bold mb-5">{{ selectedBusiness?.business }}</h3>
      <form @submit.prevent="submitForm">
        <div class="flex md:flex-row flex-col gap-4">
          <div class="w-1/2 flex flex-col">
            <label for="business-name">Name</label>
            <Field
              id="business-name"
              name="business-name"
              label="Business Name"
              placeholder="Business Name"
              v-model="selectedBusiness!.business"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="owner">Owner</label>
            <Field
              id="owner"
              name="owner"
              label="Owner"
              placeholder="Owner"
              v-model="selectedBusiness!.owner"
            />
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <label for="type">Type</label>
          <Field
            id="type"
            name="type"
            label="Business Type"
            as="select"
            v-model="selectedBusiness!.type.name"
            class="select w-full"
          >
            <option value="null" disabled>--select one --</option>
            <option v-for="(bizType, idx) in businessTypes" :key="idx" :value="bizType">
              {{ bizType }}
            </option>
          </Field>
        </div>
        <div class="flex md:flex-row flex-col gap-4 mt-5">
          <div class="w-1/2 flex flex-col">
            <label for="phone">Phone</label>
            <Field
              id="phone"
              name="phone"
              label="Phone"
              placeholder="Phone"
              v-model="selectedBusiness!.phone"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="owner">Email</label>
            <Field
              id="email"
              name="email"
              label="Email"
              placeholder="Email"
              v-model="selectedBusiness!.email"
            />
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <label for="address">Address</label>
          <Field
            id="address"
            name="address"
            label="Address"
            v-model="selectedBusiness!.address"
            class="w-full"
          />
        </div>
        <div class="flex md:flex-row flex-col gap-4 mt-5">
          <div class="w-1/2 flex flex-col">
            <label for="phone">Parcel</label>
            <Field
              id="parcel"
              name="parcel"
              label="Parcel"
              placeholder="Parcel No."
              v-model="selectedBusiness!.parcel"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="last-date-contacted">Last Date Contacted</label>
            <Field
              id="last-date-contacted"
              name="last-date-contacted"
              label="Last Date Contacted"
              type="date"
              :modelValue="formattedDate"
              @update:modelValue="updateDate"
            />
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <label for="outcome">Outcome</label>
          <Field
            id="outcome"
            name="outcome"
            label="Outcome"
            v-model="selectedBusiness!.outcome.name"
            class="w-full"
            as="select"
          >
            <option value="">-- select option --</option>
            <option v-for="outcome in outcomes" :value="outcome">{{ outcome }}</option>
          </Field>
        </div>
        <div class="flex flex-col mt-5">
          <label for="notes">Notes</label>
          <Field
            id="notes"
            name="notes"
            label="Notes"
            v-model="selectedBusiness!.notes"
            class="w-full"
            as="textarea"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col mt-5 w-1/2">
            <label for="price">Price</label>
            <Field
              id="price"
              name="price"
              label="Price"
              v-model="selectedBusiness!.price"
              class="w-full"
              type="number"
            />
          </div>
          <div class="flex flex-col mt-5 w-1/2">
            <label for="cash-flow">Cash Flow</label>
            <Field
              id="cash-flow"
              name="cash-flow"
              label="Cash Flow"
              v-model="selectedBusiness!.cashFlow"
              class="w-full"
              type="number"
            />
          </div>
        </div>
        <div class="flex mt-5">
          <Field
            id="on-market"
            name="on-market"
            label="On Market"
            v-model="selectedBusiness!.onMarket"
            class="checkbox mr-4"
            type="checkbox"
          />
          <label for="notes">On Market?</label>
        </div>
        <button class="ep-btn w-full mt-4" :disabled="isSubmitting" type="submit">Save</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="clearData">close</button>
    </form>
  </dialog>
</template>

<style scoped>
td {
  @apply border-2;
}
th {
  @apply border-x-2;
}

input,
textarea {
  @apply border-2 border-accent rounded-md p-3;
}

select {
  @apply border-2 border-accent rounded-md p-3 h-16;
}

label {
  @apply font-semibold mb-2 indent-1;
}
</style>
