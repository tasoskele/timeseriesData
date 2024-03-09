<template>
  <div>
		<form 
		class="grid grid-cols-10 gap-3 sm:grid-cols-3"
		id="dateForm" @submit.prevent="onSubmit">
			<vue-tailwind-datepicker 
				v-model="dateValue" 
				:formatter="formatter"
				:start-from="startFrom"
				as-single use-range 
			/>
			<button class="rounded border-blue-600  bg-blue-500 text-white hover:bg-blue-700 ">
				Submit
			</button>
		</form>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, computed, } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const emit = defineEmits(['datesChanged', 'legendClicked']);

const props = defineProps({
  timeseriesData: {
    type: Array,
    required: true,
  },
});

//	Legend Start
const newLegendClickHandler = function (e, legendItem, legend) {
	emit('legendClicked', legendItem.datasetIndex);	
	// Default legend click handler
	const index = legendItem.datasetIndex;
	const ci = legend.chart;
	if (ci.isDatasetVisible(index)) {
			ci.hide(index);
			legendItem.hidden = true;
	} else {
			ci.show(index);
			legendItem.hidden = false;
	}
};

const chartOptions = {
	plugins: {
		legend: {
			// Required handler for filtering table data
			onClick: newLegendClickHandler
		}
	}
};

// Form submitted
const onSubmit = () => {
	emit('datesChanged', dateValue._rawValue);
}

const startFrom = new Date();
const chartData = computed(()=> {
	// Creating arrays for chart
	const times = [];
	const dePrice = [];
	const grPrice = [];
	const frPrice = [];
	props.timeseriesData.forEach((row, i) => {
		// This startFrom variable is required by the
		// datepicker to show where the data start from
		if (i == 0) {
			startFrom.setFullYear(row.DateTime.slice(0,4));
			startFrom.setMonth(Number(row.DateTime.slice(5,7))-1);
		}
		times.push(row.DateTime.slice(0,-3));
		dePrice.push(row.ENTSOE_DE_DAM_Price);
		grPrice.push(row.ENTSOE_GR_DAM_Price);
		frPrice.push(row.ENTSOE_FR_DAM_Price);
	});	
	// Format data for chart
	const timeData = {
		labels: times,
		datasets: [
			{
				label: 'DE - Data',
				backgroundColor: '#775555',
				data: dePrice,
			},
			{
				label: 'GR - Data',
				backgroundColor: '#5555ff',
				data: grPrice,
			},
			{
				label: 'FR - Data',
				backgroundColor: '#55ff55',
				data: frPrice,
			}
		]
	}
	return timeData;
});

// Variables to hold the value of datepicker dates
const dateValue = ref({
	startDate: "",
	endDate: "",
});

// Formatter for datepicker
const formatter = ref({
	date: 'YYYY-MM-DD',
	month: 'MMM',
});
</script>
