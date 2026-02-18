"use strict";
const DEFAULT_STATE = {
    boards: [
        {
            id: crypto.randomUUID(),
            title: 'Today',
            items: [
                { id: crypto.randomUUID(), title: 'Gmail', url: 'https://mail.google.com' },
                { id: crypto.randomUUID(), title: 'Calendar', url: 'https://calendar.google.com' }
            ]
        },
        { id: crypto.randomUUID(), title: 'Later', items: [] }
    ]
};
const boardsEl = document.querySelector('#boards');
const quickOpenEl = document.querySelector('#quick-open');
const quickResultsEl = document.querySelector('#quick-results');
const newBoardEl = document.querySelector('#new-board');
const cardTemplate = document.querySelector('#card-template');
let state = structuredClone(DEFAULT_STATE);
async function loadState() {
    const data = await chrome.storage.local.get('appState');
    state = data.appState ?? structuredClone(DEFAULT_STATE);
    render();
}
async function saveState() {
    await chrome.storage.local.set({ appState: state });
}
function boardById(boardId) {
    return state.boards.find((b) => b.id === boardId);
}
function normalizeUrl(input) {
    try {
        const url = new URL(input.startsWith('http') ? input : `https://${input}`);
        return url.href;
    }
    catch {
        return null;
    }
}
function render() {
    boardsEl.innerHTML = '';
    state.boards.forEach((board) => {
        const section = document.createElement('section');
        section.className = 'board';
        section.dataset.boardId = board.id;
        const header = document.createElement('div');
        header.className = 'board-header';
        header.innerHTML = `<h2>${board.title}</h2><button data-action="rename-board">Rename</button>`;
        const addButton = document.createElement('button');
        addButton.textContent = '+ Link';
        addButton.className = 'add-link';
        addButton.addEventListener('click', () => addLink(board.id));
        section.append(header, addButton);
        if (board.items.length === 0) {
            const hint = document.createElement('p');
            hint.className = 'hint';
            hint.textContent = 'No links yet.';
            section.append(hint);
        }
        board.items.forEach((item) => {
            const node = cardTemplate.content.firstElementChild?.cloneNode(true);
            node.dataset.linkId = item.id;
            node.dataset.boardId = board.id;
            const title = node.querySelector('.card-title');
            title.textContent = item.title;
            title.href = item.url;
            const url = node.querySelector('.card-url');
            url.textContent = item.url;
            const editBtn = node.querySelector('[data-action="edit"]');
            editBtn.addEventListener('click', () => editLink(board.id, item.id));
            const deleteBtn = node.querySelector('[data-action="delete"]');
            deleteBtn.addEventListener('click', async () => {
                board.items = board.items.filter((i) => i.id !== item.id);
                await saveState();
                render();
            });
            node.addEventListener('dragstart', (e) => {
                e.dataTransfer?.setData('text/plain', JSON.stringify({ fromBoard: board.id, linkId: item.id }));
            });
            section.append(node);
        });
        section.addEventListener('dragover', (e) => e.preventDefault());
        section.addEventListener('drop', async (e) => {
            e.preventDefault();
            const raw = e.dataTransfer?.getData('text/plain');
            if (!raw)
                return;
            const { fromBoard, linkId } = JSON.parse(raw);
            if (fromBoard === board.id)
                return;
            const src = boardById(fromBoard);
            const dst = boardById(board.id);
            if (!src || !dst)
                return;
            const index = src.items.findIndex((i) => i.id === linkId);
            if (index < 0)
                return;
            const [moved] = src.items.splice(index, 1);
            dst.items.unshift(moved);
            await saveState();
            render();
        });
        const renameBtn = header.querySelector('[data-action="rename-board"]');
        renameBtn.addEventListener('click', async () => {
            const next = prompt('Board name', board.title)?.trim();
            if (!next)
                return;
            board.title = next;
            await saveState();
            render();
        });
        boardsEl.append(section);
    });
    updateQuickOpen();
}
async function addLink(boardId) {
    const board = boardById(boardId);
    if (!board)
        return;
    const title = prompt('Title')?.trim();
    if (!title)
        return;
    const rawUrl = prompt('URL (example.com or https://...)')?.trim();
    if (!rawUrl)
        return;
    const url = normalizeUrl(rawUrl);
    if (!url)
        return alert('Invalid URL');
    board.items.unshift({ id: crypto.randomUUID(), title, url });
    await saveState();
    render();
}
async function editLink(boardId, linkId) {
    const board = boardById(boardId);
    const link = board?.items.find((i) => i.id === linkId);
    if (!board || !link)
        return;
    const title = prompt('Title', link.title)?.trim();
    if (!title)
        return;
    const rawUrl = prompt('URL', link.url)?.trim();
    if (!rawUrl)
        return;
    const url = normalizeUrl(rawUrl);
    if (!url)
        return alert('Invalid URL');
    link.title = title;
    link.url = url;
    await saveState();
    render();
}
function updateQuickOpen() {
    const q = quickOpenEl.value.trim().toLowerCase();
    quickResultsEl.innerHTML = '';
    if (!q)
        return;
    const flat = state.boards.flatMap((b) => b.items);
    flat
        .filter((i) => i.title.toLowerCase().includes(q) || i.url.toLowerCase().includes(q))
        .slice(0, 8)
        .forEach((item) => {
        const chip = document.createElement('a');
        chip.className = 'result-chip';
        chip.textContent = item.title;
        chip.href = item.url;
        chip.target = '_blank';
        chip.rel = 'noopener noreferrer';
        quickResultsEl.append(chip);
    });
}
quickOpenEl.addEventListener('input', updateQuickOpen);
quickOpenEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const first = quickResultsEl.querySelector('a');
        first?.click();
    }
});
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        quickOpenEl.focus();
        quickOpenEl.select();
    }
});
newBoardEl.addEventListener('click', async () => {
    const title = prompt('New board name')?.trim();
    if (!title)
        return;
    state.boards.push({ id: crypto.randomUUID(), title, items: [] });
    await saveState();
    render();
});
loadState();
