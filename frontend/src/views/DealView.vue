<script lang="ts" setup>
import data from "@/data/businessRecords";
import type { IBusinessRecord } from "@/interfaces/IBusinessRecord";
import moment from "moment";

const businessRecords: IBusinessRecord[] = data;
</script>
<template>
  <h1>Deals</h1>
  <div class="border-2 w-2/3 overflow-scroll mx-auto">
    <table class="table table-zebra">
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
          v-for="record in businessRecords"
          :key="record.business"
          :class="record.outcome == 'Interested' ? 'bg-green-200 font-semibold' : ''"
        >
          <td class="font-semibold">{{ record.business }}</td>
          <td>{{ record.type }}</td>
          <td class="min-w-40">{{ record.owner }}</td>
          <td class="min-w-40">
            <a class="link" :href="'tel:' + record.phone">{{ record.phone }}</a>
          </td>
          <td>
            <a class="link" :href="'mailto:' + record.email">{{ record.email }}</a>
          </td>
          <td class="min-w-40">{{ record.parcel }}</td>
          <td class="min-w-64">{{ record.address }}</td>
          <td
            :class="
              moment(record.lastContactDate).fromNow().includes('days')
                ? 'bg-neutral text-white font-semibold'
                : ''
            "
          >
            <div
              class="inline-grid *:[grid-area:1/1]"
              v-if="moment(record.lastContactDate).fromNow().includes('days')"
            >
              <div class="status status-success animate-ping"></div>
              <div class="status status-success"></div>
            </div>

            {{ moment(record.lastContactDate).format("MM/DD/yyyy") }}
          </td>
          <td>{{ record.outcome }}</td>
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
</template>

<style scoped>
td {
  @apply border-2;
}
th {
  @apply border-x-2;
}
</style>
