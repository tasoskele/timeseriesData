<template>
	<div>
	  <table id="prices-tbl">
			<!-- Show or hide the table columns -->
			<colgroup>
				<col class="datetimes"/>
				<col class="de-price" />
				<col class="gr-price" />
				<col class="fr-price" />
			</colgroup>
			<thead>
				<tr>
				<th>Datetime</th>
				<th>ENTSOE_DE_DAM_Price</th>
				<th>ENTSOE_GR_DAM_Price</th>
				<th>ENTSOE_FR_DAM_Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="datapoint in timeseriesData" :key="datapoint.DateTime">
				<td>{{ datapoint.DateTime }}</td>
				<td>
					{{ formatPrice(datapoint.ENTSOE_DE_DAM_Price) }}
				</td>
				<td>
					{{ formatPrice(datapoint.ENTSOE_GR_DAM_Price) }}
				</td>
				<td>
					{{ formatPrice(datapoint.ENTSOE_FR_DAM_Price) }}
				</td>
				</tr>
			</tbody>
	  </table>
	</div>
</template>

<script setup>
	const props = defineProps({
		timeseriesData: {
    	type: Array,
    	required: true,
  	},
	});

	// Format table cell data to 2 decimals
	const formatPrice = (value) => {
		return (value/1).toFixed(2);
	}
</script>
