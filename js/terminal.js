import { showToast, escapeHTML } from './utils.js';


const terminalBody = document.getElementById('terminal-body');
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');

function appendToTerminal(input, output, isError = false) {
    if (input !== null) {
        const inputLine = document.createElement('div');
        inputLine.className = 'text-slate-300';
        inputLine.innerHTML = `<span class="text-emerald-400 font-bold">dijumper@lab:~$</span> ${escapeHTML(input)}`;
        terminalBody.appendChild(inputLine);
    }

    if (output !== null) {
        const outputLine = document.createElement('div');
        outputLine.className = isError ? 'text-rose-400' : 'text-slate-400';
        outputLine.innerHTML = output;
        terminalBody.appendChild(outputLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

export function initTerminal() {
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = terminalInput.value.trim();
        if (input === '') return;

        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        let response = '';
        let isError = false;

        switch (command) {
            case 'help':
                response = `Perintah yang tersedia:<br>
                - <span class="text-sky-400">help</span>: Menampilkan daftar perintah konsol ini.<br>
                - <span class="text-sky-400">projects</span>: Menampilkan semua daftar project inkubator.<br>
                - <span class="text-sky-400">manifesto</span>: Membaca filosofi pengembangan DIJUMPER Lab.<br>
                - <span class="text-sky-400">suggest [pesan]</span>: Mengirim usulan ide project ke DIJUMPER.<br>
                - <span class="text-sky-400">about</span>: Informasi tentang DIJUMPER Lab.<br>
                - <span class="text-sky-400">status</span>: Mengecek status ketersediaan sistem.<br>
                - <span class="text-sky-400">clear</span>: Membersihkan tampilan terminal.`;
                break;
            case 'status':
                response = `Mengecek rute sistem lab...<br>
                - /dichat : Active (Redirect)<br>
                - /disend : Active (Redirect)`;
                break;
            case 'projects':
                response = `Daftar Modul Lab Terpasang:<br>
                1. <span class="text-sky-400">dichat</span> [Active] - real-time messaging di /dichat<br>
                2. <span class="text-sky-400">disend</span> [Active] - local sharing media instan di /disend`;
                break;
            case 'manifesto':
                response = `[+] <span class="text-emerald-400">DIJUMPER LAB MANIFESTO</span><br>
                "Kami memposisikan diri sebagai Arsitek Sistem. Kami percaya bahwa pemecahan masalah dan inovasi adalah inti dari rekayasa perangkat lunak. AI adalah kepanjangan tangan kami untuk mengeksekusi visi menjadi produk nyata dengan cepat (ship fast). Human Vision, Machine Execution."`;
                break;
            case 'suggest':
                if (!args) {
                    response = `Gagal: Gunakan format perintah <span class="text-amber-400">suggest "[Ide Anda di sini]"</span>`;
                    isError = true;
                } else {
                    response = `<span class="text-emerald-400">Berhasil!</span> Ide Anda "${args}" telah didaftarkan dalam backlog riset DIJUMPER Lab. Terima kasih banyak!`;
                    showToast("Masukan Anda berhasil dikirim ke server Lab!", "success");
                }
                break;
            case 'about':
                response = `DIJUMPER Lab.<br>
                Sebuah wadah eksperimen digital dan prototipe aplikasi dari DIJUMPER. Kami merakit alat bantu (tools) dan aplikasi web sederhana, ringan, dan bermanfaat untuk publik.`;
                break;
            case 'clear':
                clearTerminal();
                terminalInput.value = '';
                return;
            case 'welcome':
                response = `Selamat datang kembali di sistem DIJUMPER Lab. Terminal siap digunakan.`;
                break;
            default:
                response = `Command not found: "${command}". Ketik <span class="text-sky-400">help</span> untuk bantuan instruksi.`;
                isError = true;
        }

        appendToTerminal(input, response, isError);
        terminalInput.value = '';
    });
}

window.clearTerminal = function () {
    terminalBody.innerHTML = `<div class="text-slate-500">// Terminal dibersihkan. Hubungkan ulang ke lab.dijumper.web.id</div>`;
}

window.terminalTrigger = function (action) {
    terminalInput.focus();
    if (action === 'suggest') {
        terminalInput.value = 'suggest "Ide Projek Baru Anda"';
    }
}