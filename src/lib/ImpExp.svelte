<script>
  import ModalCard from './ModalCard.svelte';
  import { Btn, Modal, Toast } from '@kazkadien/svelte';
  import db from '../db/db';
  import { activeProject, activeProjectSnapNames } from '../store/active';
  import { board, ws } from '../store/projects';

  /** @typedef { import('../typings/types').Project } Project */
  /** @typedef { import('../typings/types').Snap } Snap */

  let modalIsOpen = false;
  let toast = '';

  /** @param {string} params */
  async function onDownload(params) {
    // console.log(params);
    let projects;
    let snaps;

    if (params == 'all') {
      [projects, snaps] = await Promise.all([db.projects.get(), db.snap.getAll()]);
    } else if (params == 'current') {
      projects = [{ id: $activeProject.id, title: $board.title }];

      snaps = await Promise.all(
        $activeProjectSnapNames.map((name) => db.snap.get($activeProject.id, name))
      );
    } else {
      console.error('wrong params');
      return;
    }

    const saves = { projects, snaps };
    // console.log(saves);

    const fileName = 'Tabulamax_' + new Date().valueOf() + '.json';
    const type = { type: 'application/json' };
    // console.log({ fileName })

    const file = new File([JSON.stringify(saves)], fileName, type);

    const url = URL.createObjectURL(file);
    /** @type {HTMLAnchorElement} */
    const link = document.querySelector('#download');

    link.download = fileName;
    link.href = url;
    link.click();
  }

  function onImport() {
    console.log('onImport');
    /** @type {HTMLInputElement} */
    const input = document.querySelector('#downloadFile');
    const file = input.files[0];
    // console.log(file)

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      // console.log(content);

      if (typeof content == 'string') {
        /** @type {{projects: Project[] , snaps: Snap[]}} */
        const { projects, snaps } = JSON.parse(content);

        const promises = [db.projects.addMany(projects)];

        // @ts-ignore
        snaps.sort((a, b) => a.createAt < b.createAt);

        const snapByProject = {};

        snaps.forEach((s) => {
          promises.push(db.snap.set(s));

          if (!snapByProject[s.projectId]) {
            snapByProject[s.projectId] = [s.name];
          } else {
            s.name == 'current'
              ? snapByProject[s.projectId].unshift(s.name)
              : snapByProject[s.projectId].push(s.name);
          }
        });

        Object.entries(snapByProject).forEach(([id, names]) => {
          promises.push(db.snapNames.set(Number(id), names));
        });

        Promise.all(promises).then(() => {
          ws.update((v) => {
            v.projects.push(...projects);
            return v;
          });

          if ($activeProject.id === 0) {
            $activeProject.id = projects[0].id;
          }
        });
      } else {
        toast = 'Invalid type of file content';
      }
    };

    reader.readAsText(file);
  }
</script>

{#if toast}
  <Toast
    body={toast}
    autoclose={3000}
    accent="danger"
    title="Error"
    iconName="info"
    on:close={() => (toast = '')}
  />
{/if}

<Btn text="Transfer" outlined on:click={() => (modalIsOpen = true)} />

{#if modalIsOpen}
  <Modal blurBG on:close={() => (modalIsOpen = false)}>
    <ModalCard title="Download / Upload" on:close={() => (modalIsOpen = false)}>
      <div class="fdc btns">
        <Btn filled text="download all projects" on:click={() => onDownload('all')} />

        <Btn filled text="download current project" on:click={() => onDownload('current')} />

        <div class="fdc">
          <input id="downloadFile" type="file" accept="application/json" on:change={onImport} />
          <label for="downloadFile" id="lab" class="btn filled beta">
            <b>upload projects</b>
          </label>
        </div>
      </div>

      <a id="download" target="_blank" download="">#</a>
    </ModalCard>
  </Modal>
{/if}

<style>
  .btns {
    padding-top: 1rem;
    gap: 2rem;
  }
  #downloadFile {
    display: none;
  }

  #download {
    visibility: hidden;
  }
</style>
