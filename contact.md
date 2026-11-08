# 見積もり依頼

> イタリアでの従業員雇用の見積もりを依頼。3つの簡単なステップ、1営業日以内に回答します。


<section> <span class="eyebrow">見積もり依頼</span> <h1 id="tell-us-who-you-want-to-hire">採用したい方について教えてください</h1> <p class="lede">3つの簡単なステップです。1営業日以内に、総費用と契約の概要をお返しします。駐在員の後任を現地採用にする場合も、その旨をお書きください。</p> </section> <section> <form id="lead" class="panel" style="display:grid;gap:18px;max-width:640px" novalidate> <p id="stepinfo" class="tag" style="justify-self:start">ステップ 1 / 3</p> <fieldset data-step="1" style="border:0;padding:0;margin:0;display:grid;gap:14px"> <label for="email">会社のメールアドレス<input id="email" type="email" autocomplete="email" required></label> <label for="company">会社名<input id="company" autocomplete="organization"></label> </fieldset> <fieldset data-step="2" hidden style="border:0;padding:0;margin:0;display:grid;gap:14px"> <label for="service">ご希望のサービス<select id="service"><option>Employer of Record</option><option>給与計算(イタリア法人あり)</option><option>就労ビザ / ブルーカード</option><option>採用</option></select></label> <label for="count">イタリアでの人数<input id="count" type="number" min="1" value="1"></label> <label for="city">都市または地域<input id="city" placeholder="ミラノ、ローマ、リモート…"></label> <label for="salary">予定年収総額(ユーロ)<input id="salary" type="number" step="1000"></label> </fieldset> <fieldset data-step="3" hidden style="border:0;padding:0;margin:0;display:grid;gap:14px"> <label for="name">お名前<input id="name" autocomplete="name"></label> <label for="start">入社予定日<input id="start" type="date"></label> <label for="notes">その他<textarea id="notes" rows="4"></textarea></label> <label style="display:flex;gap:10px;align-items:flex-start;font-weight:400"><input id="consent" type="checkbox" style="width:auto;margin-top:5px">このお問い合わせへの回答のため、イタリア雇用が私の情報を処理することに同意します(プライバシーポリシー)。</label> </fieldset> <p id="msg" role="status" style="margin:0;color:var(--accent)"></p> <div class="cta"><button type="button" class="btn ghost" id="back" hidden>戻る</button><button type="submit" class="btn" id="next">次へ</button></div> </form> </section> <script>
// Il passo 1 salva subito l'email (lead abbandonato recuperabile dal nurturing). Endpoint del worker: /api/lead.
const f = document.getElementById('lead'); let step = 1;
const sets = [...f.querySelectorAll('fieldset')];
const data = () => Object.fromEntries([...f.querySelectorAll('input,select,textarea')].map(e => [e.id, e.type === 'checkbox' ? e.checked : e.value]));
async function save(final){ try { await fetch('/api/lead', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...data(), step, final, brand:'italykoyo'})}); } catch(e){} }
function show(){ sets.forEach(s => s.hidden = +s.dataset.step !== step);
  document.getElementById('stepinfo').textContent = `ステップ ${step} / 3`;
  document.getElementById('back').hidden = step === 1;
  document.getElementById('next').textContent = step === 3 ? '送信する' : '次へ'; }
// Ripresa dal link nelle email: ?resume=<token> precompila i campi e salta al passo successivo.
(async () => { const tok = new URLSearchParams(location.search).get('resume'); if (!tok) return;
  try { const r = await fetch('/api/lead/' + encodeURIComponent(tok)); if (!r.ok) return; const d = await r.json();
    for (const [k, v] of Object.entries(d)) { const el = document.getElementById(k); if (el && v != null) el.value = v; }
    step = d.step || 2; show(); } catch(e){} })();
document.getElementById('back').onclick = () => { step--; show(); };
f.addEventListener('submit', e => { e.preventDefault(); const m = document.getElementById('msg'); m.textContent = '';
  if (step === 1 && !document.getElementById('email').checkValidity()) { m.textContent = '続けるには有効な会社のメールアドレスを入力してください。'; return; }
  if (step === 3 && !document.getElementById('consent').checked) { m.textContent = '回答のため、同意欄にチェックを入れてください。'; return; }
  save(step === 3);
  if (step < 3) { step++; show(); } else { f.querySelectorAll('fieldset,.cta').forEach(x => x.hidden = true); m.textContent = 'ありがとうございます。1営業日以内にご連絡します。'; } });
</script>

<script>(function(){var sj=new URLSearchParams(location.search).get('subject');var n=document.getElementById('notes');if(sj&&n&&!n.value)n.value='['+sj.slice(0,40)+'] ';})();</script>


---
Source: https://italykoyo.com/contact.html
