<script lang="ts" setup>
import ContactFormData from "@/classes/ContactFormData";
import { toTypedSchema } from "@vee-validate/yup";
import { Mail, Phone } from "lucide-vue-next";
import { Field, useForm } from "vee-validate";
import { reactive, ref } from "vue";
import { object, string } from "yup";

import emailService from "@/services/emailService";

const formData = reactive<ContactFormData>(new ContactFormData());
const showNotification = ref<boolean>(false);

const { resetForm, handleSubmit, isSubmitting, errors } = useForm<ContactFormData>({
  validationSchema: toTypedSchema(
    object({
      name: string()
        .transform((x) => x.trim())
        .required("Name is required"),
      email: string().email().required("Must be a valid email address."),
      message: string().min(15, "Must be at least 15 characters."),
      businessName: string()
        .transform((x) => x.trim())
        .required("Must be include business name."),
    }),
  ),
});

const submitForm = handleSubmit(async (values: ContactFormData) => {
  try {
    const response = await emailService.sendEmail(values);
    if (!response.isSuccess) throw new Error(response.message);

    showNotification.value = true;

    setTimeout(() => {
      showNotification.value = false;
    }, 5000);

    resetForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.message ?? "There was an issue with sending the form. Please try again.");
  }
});
</script>

<template>
  <div id="contact" class="container-pane text-center my-20">
    <h2>Contact Us</h2>
    <p>
      Have a business opportunity or questions about our investment process? We'd love to hear from
      you! Whether you're looking to sell, partner, or simply learn more about what we do, reach
      out, and let's start the conversation.
    </p>

    <div class="flex flex-row place-content-center gap-20 md:gap-10 mt-10">
      <div>
        <a
          href="mailto:info@eleventhandpemberton.com"
          class="flex flex-col items-center text-center"
        >
          <Mail class="icon" />
          <p class="icon-txt">info@eleventhandpemberton.com</p>
        </a>
      </div>
      <div>
        <a href="tel:7064263022" class="flex flex-col items-center text-center">
          <Phone class="icon" />
          <p class="icon-txt">760-426-3022</p>
        </a>
      </div>
    </div>

    <form @submit.prevent="submitForm">
      <div class="flex md:flex-row flex-col gap-5">
        <div class="input-field-container">
          <Field
            name="name"
            id="name"
            autocomplete="given-name"
            v-model.lazy.trim="formData.name"
            placeholder="First and Last Name"
          />
          <small class="error-message">{{ errors.name }}</small>
        </div>
        <div class="input-field-container">
          <Field
            name="phone"
            id="phone"
            autocomplete="phone"
            v-model.lazy.trim="formData.phone"
            placeholder="Phone"
            type="tel"
          />
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-5">
        <div class="input-field-container">
          <Field
            name="email"
            id="email"
            autocomplete="email"
            v-model.lazy.trim="formData.email"
            placeholder="Email"
          />
          <small class="error-message">{{ errors.email }}</small>
        </div>

        <div class="input-field-container">
          <Field
            name="businessName"
            id="businessName"
            v-model.lazy.trim="formData.businessName"
            placeholder="Business Name"
          />
          <small class="error-message">{{ errors.businessName }}</small>
        </div>
      </div>
      <div class="flex flex-col">
        <Field
          name="business-website"
          id="business-website"
          v-model.lazy.trim="formData.website"
          placeholder="Business Website"
          type="url"
        />
        <small class="error-message">{{ errors.website }}</small>
      </div>

      <div class="flex flex-col">
        <Field
          name="message"
          id="message"
          autocomplete="message"
          as="textarea"
          v-model.lazy.trim="formData.message"
          placeholder="Tell us about you and your business"
          class="w-full rounded-lg p-3 border-accent border-2"
        />
        <small class="error-message">{{ errors.message }}</small>
      </div>

      <button type="submit" class="ep-btn" :disabled="isSubmitting">Send</button>
    </form>
  </div>
</template>

<style scoped>
form {
  @apply flex flex-col gap-5 mx-auto md:w-2/3 md:mt-10 py-10 md:rounded-3xl;
}

input {
  @apply w-full h-16 p-3 rounded-md border-2 border-accent;
}

.icon {
  @apply md:size-10 size-16 mb-5 hover:text-neutral;
}

.icon-txt {
  @apply tracking-wide hidden md:flex text-xl;
}

small {
  @apply italic text-error;
}

.input-field-container {
  @apply flex flex-col md:w-1/2;
}
</style>
