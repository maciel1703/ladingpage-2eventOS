// 1) COLE AQUI o link do seu produto na Kiwify (todos os botões usam este link)
const KIWIFY_URL = "https://pay.kiwify.com.br/MPTycgm";

document.querySelectorAll("[data-buy]").forEach(a => {
  a.href = KIWIFY_URL; a.target = "_blank"; a.rel = "noopener";
});

const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);

// Contagem regressiva de exemplo (sempre 12 dias a partir de agora)
const end = Date.now() + 12 * 864e5 + 3 * 36e5;
$("tdate").textContent = new Date(end).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
const pad = n => String(n).padStart(2, "0");
function tick() {
  const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  $("cd-d").textContent = pad(Math.floor(s / 86400));
  $("cd-h").textContent = pad(Math.floor(s % 86400 / 3600));
  $("cd-m").textContent = pad(Math.floor(s % 3600 / 60));
  $("cd-s").textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);

// QR decorativo
for (let i = 0; i < 49; i++) {
  const r = Math.floor(i / 7), c = i % 7, el = document.createElement("i");
  const finder = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
  if (!(finder || (r * 7 + c * 13) % 5 < 2)) el.className = "o";
  $("qr").appendChild(el);
}

// Aviso flutuante alternando
const msgs = ["Marina confirmou presença", "Rafael fez check-in", "Julia confirmou presença", "Pedro fez check-in"];
let m = 0; setInterval(() => { $("toast").textContent = msgs[++m % msgs.length]; }, 2800);

// Faixa de tipos de evento (duplica para o loop infinito)
$("track").innerHTML += $("track").innerHTML;

// Ingresso inclina com o mouse
const tk = document.querySelector(".tk");
addEventListener("pointermove", e => {
  if (rm || innerWidth < 860) return;
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  tk.style.transform = `rotate(${3 + x * 4}deg) translate(${x * 12}px, ${y * 8}px)`;
});

// Botão fixo no celular: aparece depois do topo e some na área de preço
let hv = true, pv = false;
const st = document.querySelector(".sticky"), upd = () => st.classList.toggle("show", !hv && !pv);
new IntersectionObserver(e => { hv = e[0].isIntersecting; upd(); }).observe(document.querySelector(".hero"));
new IntersectionObserver(e => { pv = e[0].isIntersecting; upd(); }).observe($("planos"));

$("year").textContent = "© " + new Date().getFullYear();
