<script>
	import { Dtl } from '@kazkadien/svelte';
</script>

<div class="wrapper">
	<article class="container">
		<div class="">
			<header>
				<img src="favicon.svg" alt="tabulamax logo" />
				<h1>Tabulamax</h1>
			</header>

			<div>
				<p>
					Design database tables, generate
					<a href="https://en.wikipedia.org/wiki/SQL">SQL</a> and
					<span>
						<a href="https://knexjs.org/"> Knex.js </a>
						migraions,
					</span>
					<span>
						<a href="https://www.typescriptlang.org"> Typescript </a>
						interfaces,
					</span>
					<span>
						<a href="https://go.dev/">Golang</a>
						structs,
					</span>
					<a href="https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model"> ER </a>
					Diagrams.
				</p>
			</div>

			<p>
				Free and open-source project -
				<a href="https://github.com/tabulamax/" class="link" aria-label="link to repo">
					Github
					<!-- <svg width="24" height="24" viewBox="0 0 24 24"> -->
					<!-- 	<use href="#github" /> -->
					<!-- </svg> -->
				</a>
			</p>
		</div>

		<Dtl heading="Related Projects" open={!1}>
			<nav>
				<ul class="alpha">
					<li>
						<a href="https://hotatap.delphic.top" class="btn text"
							>Web-Client to Test and Debug REST API</a
						>
					</li>
					<li>
						<a href="https://json-viewer.delphic.top" class="btn text"
							>JSON Viewer - Explore JSON Data</a
						>
					</li>
					<li>
						<a
							href="https://chrome.google.com/webstore/detail/functional-json-viewer/cokkmplppnaigoodkkjopoblfaelibab"
							class="btn text">Functional JSON Viewer - Chrome Extension</a
						>
					</li>
					<li>
						<a href="https://www.timerone.com/pomodoro" class="btn text"
							>Online Pomodoro - Stay Focused and Productive</a
						>
					</li>
				</ul>
			</nav>
		</Dtl>
	</article>
</div>

<style>
	.wrapper {
		background-color: var(--bg0);
		border-top: 1px solid var(--line);
		/* background-color: var(--alpha-bright); */
		padding-block: 6rem 8rem;
		padding-inline: 1rem;
	}
	.container {
		max-width: 1200px;
		margin-inline: auto;

		display: grid;
		gap: 2rem;
		--dtl-pi: 1rem;

		& > div {
			background: var(--bg);
			border-radius: 1rem;
			padding-inline: 1rem;
		}

		& > details:not([open]) {
			border-color: transparent;
		}
	}

	header {
		display: flex;
		gap: 1em;
	}

	ul {
		display: grid;
		gap: 0.2em;
		/* background: var(--bg); */
		/* border-radius: 1rem; */
		/* padding: 1rem; */
	}
	a {
		color: var(--fg);
	}
</style>
