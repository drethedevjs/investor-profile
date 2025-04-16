<script lang="ts" setup>
import type { IBusinessType } from "@/interfaces/BusinessType";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import type IEPResponse from "@/interfaces/IEPResponse";
import type { IOutcome } from "@/interfaces/Outcome";
import businessService from "@/services/businessService";
import { toTypedSchema } from "@vee-validate/yup";
import { Field, useForm } from "vee-validate";
import { computed, defineEmits, defineProps, ref } from "vue";
import { object, string } from "yup";

const props = defineProps<{
  businessRecord: IBusinessRecord | null;
  businessTypes: IBusinessType[];
  outcomes: IOutcome[];
}>();

const emit = defineEmits<{
  (e: "updateBusinessRecord", updatedRecord: IBusinessRecord): void;
  (e: "saveBusinessRecord", savedRecord: IBusinessRecord): void;
}>();

let successfulSaveToggle = ref<boolean>(false);
const showSavedSuccessOnForm = () => {
  successfulSaveToggle.value = true;

  setTimeout(() => {
    successfulSaveToggle.value = false;
  }, 3000);
};

const formattedDate = computed(() =>
  props.businessRecord?.lastContactDate
    ? new Date(props.businessRecord.lastContactDate).toISOString().split("T")[0]
    : "",
);

const { handleSubmit, isSubmitting, errors } = useForm<IBusinessRecord>({
  validationSchema: toTypedSchema(
    object({
      business: string()
        .transform((x) => x.trim())
        .required("Name is required"),
      type: string().required("Business must have a type."),
      phone: string().required("Need phone number."),
      address: string().required("Address required."),
    }),
  ),
});

const submitForm = handleSubmit(async (values: IBusinessRecord) => {
  try {
    let response: IEPResponse<IBusinessRecord | null>;
    const isUpdated = Boolean(values.id);

    if (isUpdated) {
      response = await businessService.updateBusinessRecord(values);
      if (!response.isSuccess) throw new Error(response.message);

      emit("updateBusinessRecord", response.data!);
    } else {
      response = await businessService.saveBusinessRecord(values);
      if (!response.isSuccess) throw new Error(response.message);

      emit("saveBusinessRecord", response.data!);
    }

    showSavedSuccessOnForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.message ?? "There was an issue with sending the form. Please try again.");
  }
});

const updateDate = (newValue: string) => {
  if (props.businessRecord) {
    props.businessRecord.lastContactDate = new Date(newValue);
  }
};
</script>

<template>
  <dialog id="business_form_data" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="text-7xl font-bold mb-5">{{ businessRecord?.business }}</h3>
      <form @submit.prevent="submitForm">
        <div class="hidden">
          <Field id="id" name="id" v-model="props.businessRecord!.id" />
        </div>

        <div class="flex md:flex-row flex-col gap-4">
          <div class="w-1/2 flex flex-col">
            <label for="business">Name</label>
            <Field
              id="business"
              name="business"
              label="Business Name"
              placeholder="Business Name"
              v-model="props.businessRecord!.business"
            />
            <small class="mt-2 ml-1 text-red-600">{{ errors.business }}</small>
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
            v-model="props.businessRecord!.type._id"
            class="select w-full"
          >
            <option value="null" disabled>--select one --</option>
            <option v-for="bizType in businessTypes" :key="bizType._id" :value="bizType._id">
              {{ bizType.name }}
            </option>
          </Field>
          <small class="mt-2 ml-1 text-red-600">{{ errors.type }}</small>
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
            <small class="mt-2 ml-1 text-red-600">{{ errors.phone }}</small>
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
          <small class="mt-2 ml-1 text-red-600">{{ errors.address }}</small>
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
            <label for="lastContactDate">Last Date Contacted</label>
            <Field
              id="lastContactDate"
              name="lastContactDate"
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
            v-model="$props.businessRecord!.outcome._id"
            class="w-full"
            as="select"
          >
            <option value="">-- select option --</option>
            <option v-for="outcome in outcomes" :key="outcome._id" :value="outcome._id">
              {{ outcome.name }}
            </option>
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
            <label for="cashFlow">Cash Flow</label>
            <Field
              id="cashFlow"
              name="cashFlow"
              label="Cash Flow"
              v-model="$props.businessRecord!.cashFlow"
              class="w-full"
              type="number"
            />
          </div>
        </div>
        <div class="flex mt-5">
          <Field
            id="onMarket"
            name="onMarket"
            label="On Market"
            v-model="$props.businessRecord!.onMarket"
            class="checkbox mr-4"
            type="checkbox"
          />
          <label for="notes">On Market?</label>
        </div>
        <button
          type="submit"
          class="ep-btn w-full mt-4 disabled:bg-neutral"
          :disabled="isSubmitting"
        >
          <span v-show="isSubmitting" class="loading loading-dots loading-md"></span>
          <span v-show="!isSubmitting">Save</span>
        </button>
        <div class="text-center mt-3">
          <small v-show="successfulSaveToggle" class="text-success">Record saved!</small>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
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
