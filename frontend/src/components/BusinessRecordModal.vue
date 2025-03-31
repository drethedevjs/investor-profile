<script lang="ts" setup>
import BusinessFormData from "@/classes/BusinessFormData";
import { toTypedSchema } from "@vee-validate/yup";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, reactive } from "vue";
import { object, string } from "yup";

const props = defineProps(["businessRecord", "businessTypes", "outcomes"]);

const formattedDate = computed(() =>
  props.businessRecord.value?.lastContactDate
    ? new Date(props.businessRecord.value.lastContactDate).toISOString().split("T")[0]
    : "",
);

const formData = reactive<BusinessFormData>(new BusinessFormData());
const clearData = () => (props.businessRecord.value = new BusinessFormData());

onMounted(() => {
  clearData();
});

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

const updateDate = (newValue: string) => {
  if (props.businessRecord.value) {
    props.businessRecord.value.lastContactDate = new Date(newValue);
  }
};
</script>

<template>
  <dialog id="business_form_data" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="text-7xl font-bold mb-5">{{ businessRecord?.business }}</h3>
      <form @submit.prevent="submitForm">
        <div class="flex md:flex-row flex-col gap-4">
          <div class="w-1/2 flex flex-col">
            <label for="business-name">Name</label>
            <Field
              id="business-name"
              name="business-name"
              label="Business Name"
              placeholder="Business Name"
              v-model="props.businessRecord!.business"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="owner">Owner</label>
            <Field
              id="owner"
              name="owner"
              label="Owner"
              placeholder="Owner"
              v-model="props.businessRecord!.owner"
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
            v-model="props.businessRecord!.type.name"
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
              v-model="$props.businessRecord!.phone"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="owner">Email</label>
            <Field
              id="email"
              name="email"
              label="Email"
              placeholder="Email"
              v-model="$props.businessRecord!.email"
            />
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <label for="address">Address</label>
          <Field
            id="address"
            name="address"
            label="Address"
            v-model="$props.businessRecord!.address"
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
              v-model="$props.businessRecord!.parcel"
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
            v-model="$props.businessRecord!.outcome.name"
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
            v-model="$props.businessRecord!.notes"
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
              v-model="$props.businessRecord!.price"
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
              v-model="$props.businessRecord!.cashFlow"
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
            v-model="$props.businessRecord!.onMarket"
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
