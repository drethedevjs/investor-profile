<template>
  <div id="investment-criteria" class="lg:mx-52 mx-10">
    <div class="mx-auto text-center 2xl:w-7/12">
      <h2 class="text-neutral">Investment Criteria</h2>
      <p class="text-white">
        We focus on businesses that align with our values and have strong potential for growth. Our
        investments are driven by a commitment to sustainability, innovation, and long-term success.
        Below, you'll find the key factors we consider when evaluating investment opportunities.
      </p>
      <table class="table">
        <tbody>
          <tr>
            <td class="text-right">Sell Price</td>
            <td>$500,000 max</td>
          </tr>
          <tr>
            <td class="text-right">Cashflow</td>
            <td>$200,000+</td>
          </tr>
          <tr>
            <td class="text-right">Business Age</td>
            <td>5 years+</td>
          </tr>
          <tr>
            <td class="text-right">Employee</td>
            <td>3+</td>
          </tr>
          <tr>
            <td class="text-right">Financing</td>
            <td>Seller Financing</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
tbody {
  @apply md:text-3xl text-2xl;
}

td {
  @apply border-b-2;
}

tr:hover {
  @apply bg-accent text-primary transition-colors;
}
</style>
