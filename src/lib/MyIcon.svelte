<script>
  /** @typedef {import("@kazkadien/svelte/types").IconName} IconName*/
  /** @typedef {import("@kazkadien/svelte/types").Accent} Accent*/
  /** @type Accent | '' */
  export let accent = '';
  /** @typedef {import("../typings/types").MyIcon} MyIcon*/

  /** @type MyIcon | IconName*/
  export let name;
  export let fill = 'currentColor';
</script>

<svg height="24px" width="24px" viewBox="0 0 24 24" {fill} class={accent}>
  <use href={`#${name}`} />
</svg>

<!-- <style>
  svg.at {
    fill: var(--accent-text, currentColor);
  }
</style> -->
