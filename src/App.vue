<template>
	<div
	class="md:w-10/12 shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"
	>
		<h2 class="text-3xl font-bold">
			Timeseries Data Chart
		</h2>
		<LineChart 
			:timeseriesData="filteredData" 
			@datesChanged="handleDatesChanged"
			@legendClicked="handleLegendClicked"
		/>
		<h2 class="text-3xl font-bold">
			Timeseries Data Table</h2>
		<Table :timeseriesData="filteredData" />
	</div>
</template>
  
<script setup>
	import LineChart from './components/LineChart.vue';
  import Table from './components/Table.vue';
	
	import { ref, onMounted, } from 'vue';

	const filteredData = ref([]);
	let seriesData = [];	
	
	onMounted(() => {
		// Fetch data from timeseries.json
		fetch('./timeseries.json')
		.then(response => response.json())
		.then(data => {
			seriesData = data;
			filteredData.value = seriesData;
		})
		.catch(error => {
				console.error('Error fetching data:', error);
		});
	});

	//Filter dates on Submit
	const handleDatesChanged = (dates) => {
		filteredData.value = seriesData.filter(row => {
			const dtStart = new Date(dates.startDate);
			const dtRow = new Date(row.DateTime);
			const dtEnd = new Date(dates.endDate);
			dtEnd.setDate(dtEnd.getDate() + 1);
			return (dtRow >= dtStart) && (dtRow <= dtEnd);
		});
	};

	//Legend toggle to filter the table
	const handleLegendClicked = (legendElement) => {
		const table = document.getElementById("prices-tbl");
		const col_no = legendElement+1;
		const column = table.getElementsByTagName('col')[col_no];
		if (column){
			let shown = column.style.visibility;
			column.style.visibility = 
				(shown == "collapse") ? "visible" : "collapse";
		}
	}

</script>
