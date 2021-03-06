const kw = require('kiwis');

// Create a DataFrame from an array of objects...
const h2g2Characters = kw.DataFrame([
	{
		name: 'Marvin',
		surname: '',
		occupation: 'Paranoid Android'
	},
	{
		name: 'Zaphod',
		surname: 'Beeblebrox',
		occupation: 'President of the Galaxy'
	},
	{
		name: 'Arthur',
		surname: 'Dent',
		occupation: null
	}
]);

// ... or load a CSV file into a DataFrame
const data = kw.loadCSV('sentiment_differences.csv');

// Display DataFrames
h2g2Characters.show();	// Same as running console.log(h2g2Characters.toString())
data.show();			// Large cells and DataFrames get truncated

// Access rows
console.log(h2g2Characters.first(), h2g2Characters.get(1));
console.log();

h2g2Characters.name.show()

// Show columns as Series
data['url'].show();
data.title.show();

// Convert a DataFrame to an array of Objects
console.log(h2g2Characters.toArray());
console.log();

// Display a slice of a DataFrame
data.slice(10, 24).show();

// Iterate over the rows and indexes of a DataFrame
for (let [index, row] of h2g2Characters.items()) {
	console.log(`${index + 1}.`);
	console.log(`Name: ${row.name} ${row.surname}`);
	console.log(`Occupation: ${row.occupation || 'N/A'}`);
	console.log();
}

// Drop N/A values
h2g2Characters.dropNA().show();
h2g2Characters.dropNA({ keep: [''], axis: 'columns' }).show();

// Append new rows to a DataFrame...
h2g2Characters.append([
	{
		name: 'Ford',
		surname: 'Prefect',
		occupation: 'Writer for the Hitchhiker\'s Guide to the Galaxy'
	},
	{
		name: 'Trillian',
		surname: '',
		species: 'human'
	}
], { extend: true }).show();

// ...or insert a new row to a DataFrame
h2g2Characters.insert({
	name: 'Slartibartfast',
	surname: '',
	occupation: 'Planet designer'
}, 2, { extend: true }).show();

h2g2Characters.addColumn('fullName', h2g2Characters.map(e => [e.name, e.surname].filter(e => e !== '').join(' ')), { inPlace: true }).show();

h2g2Characters.dropNA().show();
h2g2Characters.dropNA({ keep: [''], axis: 'columns' }).show();

// Rename and reorder columns
h2g2Characters
	.rename({ surname: 'familyName', occupation: 'job' })
	.reorder(['familyName', 'name', 'species', 'job'])
	.show();

// Rename and reorder columns
h2g2Characters
	.replace('Dent', 'Accroc', { inPlace: false, columns: ['occupation', 'name'] })
	.show();

h2g2Characters.concat(h2g2Characters).show();


// Add a new column to a DataFrame by applying a function to it, and save it as CSV
h2g2Characters.addColumn('fullName', h2g2Characters.map(e => `${e.name} ${e.surname}`), { inPlace: true });
h2g2Characters.show();
h2g2Characters.toCSV('h2g2Characters.csv');

// Create a PivotTable on specific columns...
const pivotTable = data.pivot(['sector', 'date']);
pivotTable.show();

// ...and apply a rollup function on this table
pivotTable.mean('score').show();

// Sort articles by date and by score, and only show a selection of columns
data.sort(['date', 'score']).filter(['title', 'date', 'score']).show();

// Filter articles published on 4/8/2020 and calculate their mean score after rounding them to 2 digits
console.log(data.filter(e => e.date == '2020-04-08').score.round(2).mean());
