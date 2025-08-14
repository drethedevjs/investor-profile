<script lang="ts" setup>
import ContactPane from "@/components/ContactPane.vue";
import businessTypes from "@/data/businessTypes";
import { Mail, Phone } from "lucide-vue-next";
</script>
<template>
  <div
    id="header-pane"
    class="flex flex-col lg:flex-row bg-primary text-white lg:p-20 border-y-8 border-neutral"
  >
    <div class="lg:w-1/3 lg:place-content-center">
      <img
        src="/images/ep-holdings-president.jpeg"
        alt="Head shot of company president."
        class="rounded-full lg:size-auto size-96 p-5 place-self-center"
      />
    </div>
    <div id="personal-info" class="lg:w-2/3 text-center">
      <p class="md:text-7xl 2xl:text-9xl text-6xl">Andre Thomas</p>
      <div class="flex flex-col md:mt-10 md:flex-row mt-5">
        <div class="md:w-1/2 w-full">
          <p class="mini-header">Location</p>
          <p class="mini-text">CSRA Area</p>
        </div>
        <div class="md:w-1/2 w-full">
          <p class="mini-header">Contact</p>
          <div class="flex gap-1 items-center place-content-center">
            <Phone />
            <p class="mini-text">706-426-3022</p>
          </div>

          <div class="flex gap-1 items-center place-content-center">
            <Mail />
            <p class="mini-text">andre@eleventhandpemberton.com</p>
          </div>
        </div>
      </div>
      <div class="w-5/6 mx-auto">
        <p class="mini-header">Bio</p>
        <p class="mini-text mb-10">
          I'm a software engineer based in the CSRA with a passion for leveraging technology to make
          businesses more efficient. With a background in software development and process
          automation, I bring a data-driven approach to investing. When I'm not analyzing deals, I
          enjoy spending time with my wife and kids.
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-col mx-auto container mt-10">
    <div id="investment-focus" class="sm:mt-20 mt-10">
      <h2>Investment Focus</h2>
      <div class="overflow-auto">
        <table class="table text-2xl">
          <thead>
            <tr>
              <td class="w-2/12"></td>
              <td class="w-10/12"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="header-row">Asset Class:</td>
              <td>Small Businesses</td>
            </tr>
            <tr>
              <td class="header-row">Risk Tolerance:</td>
              <td>Long-term holds</td>
            </tr>
            <tr>
              <td class="header-row">Preferred Investment Structure:</td>
              <td>
                <ul class="mb-5">
                  <li>Seller Financing <small>(ideal!)</small></li>
                  <li>90/10 equity split with option to purchase remaining 10%</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="header-row">Target Industries:</td>
              <td>
                <span class="ep-badge mr-3" v-for="(t, idx) in businessTypes" :key="idx">
                  {{ t.name }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="past-investments" class="mt-20">
      <h2>Past Investments</h2>
      <table class="table md:text-2xl text-xl rounded-box border border-base-content/5">
        <thead>
          <tr>
            <th class="w-2/12">Investment</th>
            <th class="w-10/12">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Real Estate</td>
            <td>
              In 2023, I acquired a rental property in Aiken, SC, marking my first investment in
              real estate. This experience has given me firsthand knowledge of property management,
              market analysis, and long-term asset growth. I continue to refine my investment
              strategy with a focus on identifying opportunities that offer strong returns and
              sustainable growth.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="criteria" class="mt-20">
      <h2>Investment Criteria</h2>
      <table class="table md:text-2xl text-xl rounded-box border border-base-content/5">
        <thead>
          <tr>
            <th class="w-2/12"></th>
            <th class="w-10/12"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="header-row">Deal Size</td>
            <td>$500,000 max</td>
          </tr>
          <tr>
            <td class="header-row">Location Preference(s)</td>
            <td>Georgia and South Carolina. The closer to the CSRA area, the better.</td>
          </tr>
          <tr>
            <td class="header-row">Company Stage</td>
            <td>Established businesses. At least 5 years old.</td>
          </tr>
          <tr>
            <td class="header-row">Financial Metrics</td>
            <td>Profitable and cash flows (or SDE) ~$100,000+</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="value-add" class="mt-20 md:px-0 px-5">
      <h2>Strengths</h2>
      <p class="lg:ml-10 lg:text-left text-justify">
        I thrive on using technology to streamline operations and enhance efficiency in businesses.
        Whether it's automating processes, improving data management, or optimizing workflows, I
        enjoy finding innovative ways to make businesses run smoother and more profitably.
        Identifying areas for improvement comes naturally to me, and I take a hands-on approach to
        implementing solutions that drive real results.
      </p>
      <p class="lg:ml-10 lg:text-left text-justify">
        Beyond technology, I believe that the foundation of any successful business lies in
        attention to detail and customer service. I'm a firm believer in maintaining clean,
        organized spaces—both physically and operationally—because a well-structured environment
        leads to higher productivity and better customer experiences. Quality service isn't just a
        goal; it's a non-negotiable standard for any business I operate.
      </p>
      <p class="lg:ml-10 lg:text-left text-justify">
        Additionally, I have a strong background in sales and business development. I understand
        that real opportunities often require direct outreach, and I have no hesitation in going
        door to door or business to business to make connections and close deals. My persistence,
        communication skills, and ability to build relationships give me a competitive edge in
        acquiring and growing investments.
      </p>
    </div>

    <ContactPane />
  </div>
</template>

<style scoped>
.mini-header {
  @apply font-semibold text-neutral md:text-5xl;
}
.mini-text {
  @apply 2xl:text-4xl xl:text-3xl md:text-2xl md:leading-normal;
}

.header-row {
  @apply font-semibold text-right;
}
li {
  @apply text-2xl;
}

th {
  @apply text-black text-xl;
}

h2 {
  @apply md:text-left text-center;
}

.ep-badge {
  @apply text-xl border-2 px-3 rounded-lg text-primary border-primary;
}
</style>
