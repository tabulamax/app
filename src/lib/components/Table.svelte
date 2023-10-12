<script>
	import { Btn } from '@kazkadien/svelte';
	import MyIcon from './MyIcon.svelte';

	import { createEventDispatcher } from 'svelte';

	import { KEYS_EMOJI, DATATYPES_KNEX } from '../data/constants';

	const dispatch = createEventDispatcher();
	/** @type {import("../typings/types").Table}*/
	export let table;

	export let editable = false;
	// console.log(_)
	let confirm = false;

	const onDelete = () => {
		confirm = true;
		setTimeout(() => {
			confirm = false;
		}, 2000);
	};

	/* Drag & Drop */
	let movedElemIdx;
	let draggedElem;
	let enteredElem;
	let enteredElemID;
	let draggedTableName;

	const onDragStart = (i, elemId, tableName) => {
		// console.log({ c: "onDragStart", i, elemId })
		draggedElem = document.getElementById(elemId);
		draggedElem.style.opacity = '0.5';

		movedElemIdx = i;
		draggedTableName = tableName;
	};

	const onDragEnd = () => {
		// console.log('onDragEnd :')
		draggedElem.style.opacity = '1';
		draggedTableName = null;
	};

	const onDragEnter = (elemId, tableName) => {
		// console.log('onDragEnter :', elemId)
		if (enteredElemID != elemId && draggedTableName == tableName) {
			enteredElem = document.getElementById(elemId);
			// console.log(enteredElem)
			enteredElem.classList.add('over');
			enteredElemID = elemId;
		}
	};

	const onDragLeave = (elemId) => {
		// console.log('onDragLeave :', elemId)
		let el = document.getElementById(elemId);
		el.classList.remove('over');
	};

	const onDrop = (idxToMoveTo, tableName) => {
		// console.log({ onDropId: i, tableName, idxToMoveTo })
		if (enteredElem) enteredElem.classList.remove('over');

		if (draggedTableName == tableName) {
			dispatch('rearrange', { tableName, movedElemIdx, idxToMoveTo });
		}
	};
	/* Drag & Drop */

	/* Keys highlight */
	let primaryKeysToHighlight;
	let foreignKeysToHighlight;

	const onMouseEnter = (key, { refTableId, tableId }) => {
		// console.log({ key, refTableId, tableId });
		if (key == 'FK' || refTableId) {
			const selector = '.PK_of_' + refTableId;
			primaryKeysToHighlight = document.querySelectorAll(selector);
			// console.log(primaryKeysToHighlight)
			primaryKeysToHighlight.forEach((element) => {
				element.classList.add('highlight-PK');
			});
		}

		if (key == 'PK') {
			const selector = '.FK_of_' + tableId;
			foreignKeysToHighlight = document.querySelectorAll(selector);
			// console.log(foreignKeysToHighlight)
			foreignKeysToHighlight.forEach((element) => {
				element.classList.add('highlight-FK');
			});
		}
	};

	const onMouseLeave = () => {
		// console.log('onMouseOut')
		if (primaryKeysToHighlight) {
			primaryKeysToHighlight.forEach((element) => {
				element.classList.remove('highlight-PK');
			});
			primaryKeysToHighlight = null;
		}

		if (foreignKeysToHighlight) {
			foreignKeysToHighlight.forEach((element) => {
				element.classList.remove('highlight-FK');
			});
			foreignKeysToHighlight = null;
		}
	};
	/* Keys highlight */
</script>

<div class="table">
	<header
		role=""
		class:is-done={table.isDone}
		on:dragstart={() => dispatch('drag-table')}
		class="draggable"
		draggable="true"
	>
		<h3>{table.name}</h3>

		<Btn
			on:click={() => dispatch('edit')}
			colored
			iconOnly
			variant="text"
			accent="alpha"
			disabled={!editable}
			title="add table"
		>
			<!-- <Tooltip text="edit table" /> -->
			<MyIcon name="edit" />
		</Btn>

		<Btn
			on:click={() => (table.isDone = !table.isDone)}
			colored
			iconOnly
			variant="text"
			accent="beta"
			title="done"
		>
			<!-- <Tooltip text="done" /> -->
			<MyIcon name={table.isDone ? 'done_all' : 'remove_done'} />
		</Btn>

		{#if !confirm}
			<Btn
				on:click={onDelete}
				title="double click to delete table"
				iconOnly
				variant="text"
				disabled={!editable}
				colored
				accent="danger"
			>
				<!-- <Tooltip text="double click to delete table" /> -->
				<MyIcon name="delete" />
			</Btn>
		{:else}
			<Btn on:click={() => dispatch('delete')} iconOnly variant="text" colored accent="danger">
				<MyIcon name="delete_forever" />
			</Btn>
		{/if}
	</header>

	<ul>
		{#each table.columns as col, i (i)}
			<li
				class="
        {col.references?.tableId ? `FK_of_${col.references?.tableId}` : ''}
        {col.key == 'PK' ? `PK_of_${table.id}` : ''}
        "
			>
				<div
					on:mouseenter={() =>
						onMouseEnter(col.key, {
							refTableId: col.references?.tableId,
							tableId: table.id
						})}
					on:mouseleave={onMouseLeave}
					draggable="true"
					class="draggable"
					id={table.name + i}
					on:dragstart={() => onDragStart(i, table.name + i, table.name)}
					on:dragend={onDragEnd}
					on:dragenter={() => onDragEnter(table.name + i, table.name)}
					on:dragleave={() => onDragLeave(table.name + i)}
					on:dragover|preventDefault={() => false}
					on:drop|preventDefault|stopPropagation={() => onDrop(i, table.name)}
				>
					{#if col.references?.tableId && col.key == 'PK'}
						<span class="key pfk">{KEYS_EMOJI.get('PFK')} </span>
					{:else}
						<span class="key {KEYS_EMOJI.get(col.key) ? 'pfk' : ''}">{KEYS_EMOJI.get(col.key)}</span
						>
					{/if}

					<span>
						{col.name}
						{#if col.unique}
							<mark> *</mark>
						{/if}
						{#if col.nullable}
							<mark> ?</mark>
						{/if}
					</span>

					<span class="datatype">{DATATYPES_KNEX[col.datatype]}</span>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.table {
		--_lightness: 85%;

		--aa: hsl(var(--hue-alpha) var(--saturation) var(--_lightness));
		--bb: hsl(var(--hue-beta) var(--saturation) var(--_lightness));
		/* --cc: hsl(var(--hue-gamma) var(--saturation) var(--_lightness)); */

		--table-header: var(--bg1);
		--table-header-done: var(--bb);

		--table-keys: var(--bg3);
		--table-col-hover: var(--bg4);

		--border-color: var(--aa);
		--border-color: var(--line);

		--primary-key-hover: var(--aa);
		--foreign-key-hover: var(--bb);

		--border-radius: 0.5em;

		border-radius: var(--border-radius);

		border: 1px solid;
		border-color: var(--border-color);

		/* background-color: transparent; */
		background-color: var(--bg1);

		width: 100%;
		max-width: var(--max-table-width);
	}

	:global(html.dark) .table {
		--_lightness: 14%;
	}

	/* TABLE HEAD */
	header {
		background-color: var(--table-header);

		text-transform: uppercase;

		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--border-color);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}

	header.is-done {
		background-color: var(--table-header-done);
	}

	h3 {
		flex: 1 1;
		padding: 1em;
		margin: 0;
		font-weight: normal;
		color: var(--fg);
	}
	/* TABLE HEAD */

	/* TABLE COLS */
	li > div {
		display: grid;
		grid-template-columns: calc(2ch + 2em) 1fr calc(9ch + 2em);
	}

	li > div > span {
		padding: 0.5em 1em;
		background-color: var(--bg2);
		/* transition: background-color 0.25s ease-in; */
		/* background-color: green; */
	}
	li > div > span.key {
		background-color: var(--table-keys);
		/* background-color: var(--pr-lighter); */
	}
	li > div > span.pfk + span {
		color: var(--fg-alpha);
		/* outline: 1px solid yellow; */
	}
	li > div > span.datatype {
		/* font-style: italic; */
		color: var(--fg-beta);
		/* background-color: aquamarine; */
	}

	li:hover > div > span {
		background-color: var(--table-col-hover);
	}

	li[class*='PK']:hover > div > span,
	li.highlight-FK > div > span {
		background-color: var(--primary-key-hover);
	}

	li[class*='FK']:hover > div > span,
	li.highlight-PK > div > span {
		background-color: var(--foreign-key-hover);
	}

	li.highlight-FK > div,
	li.highlight-PK > div {
		outline: 0.2em solid var(--fg-danger);
	}

	li ~ li {
		border-top: 1px solid var(--border-color);
	}

	li:last-child > div {
		border-radius: 0 0 var(--border-radius) var(--border-radius);
		overflow: hidden;
		/* outline: 4px solid red; */
	}

	mark {
		background-color: transparent;
		font-weight: bold;
		color: var(--fg-danger);
	}

	.draggable {
		cursor: move;
		cursor: grab;
	}

	.over {
		outline: 0.2em dotted var(--fg-danger);
	}
</style>
