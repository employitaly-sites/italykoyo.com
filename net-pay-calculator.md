# イタリアの手取り計算

> 2026年のイタリアの額面から手取りまで:従業員の社会保険料、給与所得控除を含む所得税(IRPEF)、州・市の付加税。ミラノ、ローマ、トリノ、ボローニャ、ナポリ。


<section> <span class="eyebrow">手取り計算</span> <h1 id="what-your-employee-takes-home-in-italy">イタリアの従業員の手取りはいくらか</h1> <p class="lede">年収総額と都市を入力してください。2026年のルール(従業員の社会保険料、給与所得の税額控除を含む所得税、地方付加税)で試算します。</p> </section> <section> <div class="grid"> <form class="panel" id="nf" style="display:grid;gap:16px"> <label for="g">年収総額 RAL(ユーロ)<input id="g" type="number" min="10000" step="1000" value="50000"></label> <label for="city">都市<select id="city"><option>Milan</option><option>Rome</option><option>Turin</option><option>Bologna</option><option>Naples</option></select></label> <label for="inst">支払回数<select id="inst"><option value="13">13回</option><option value="14">14回</option><option value="12">12回(13・14か月目を按分)</option></select></label> </form> <div class="panel" style="min-width:0"><div class="tbl"><table id="nt"><thead><tr><th>項目</th><th class="num">年額</th></tr></thead><tbody></tbody></table></div> <p id="nm" style="margin-bottom:0;font-weight:600"></p></div> </div>  </section> <section class="prose"> <h2 id="how-the-calculation-works">計算の仕組み</h2> <ol> <li>従業員は給与総額の9.19%を社会保険料として負担し、年€56,224を超える部分にはさらに1%がかかります。</li> <li>残りに所得税(IRPEF)がかかります:€28,000まで23%、€28,000〜€50,000は33%、それ以上は43%。</li> <li>給与所得の税額控除が税額を減らします。低い給与ほど大きく、€50,000でゼロになります。€20,000〜€40,000では最大€1,000の追加控除があります。</li> <li>州と市の付加税を加えます。所得が市の免税点未満なら市の付加税はかかりません。</li> </ol> <p>いずれも事業主である貴社の支払額は変えません。<a href="calculator.html">事業主の費用シミュレーター</a>をご覧ください。</p> </section> <script>(function(){const N = {"status":"secondary","source":"data/params/2026.yaml (irpef, inps, addizionali); TUIR art. 11 and 13; L. 207/2024; L. 199/2025","employee_inps":0.0919,"extra_1pct_above":56224,"irpef":[[28000,0.23],[50000,0.33],[null,0.43]],"cities":{"Milan":{"region":"Lombardy","regional":[[null,0.0123]],"municipal":0.008,"exempt":23000},"Rome":{"region":"Lazio","regional":[[28000,0.0173],[null,0.0333]],"municipal":0.009,"exempt":14000},"Turin":{"region":"Piedmont","regional":[[null,0.0162]],"municipal":0.008,"municipal_note":"0.8% to 1.2% by band; 0.8% used","exempt":11790},"Bologna":{"region":"Emilia-Romagna","regional":[[null,0.0133]],"municipal":0.008,"exempt":15000},"Naples":{"region":"Campania","regional":[[null,0.0173]],"municipal":0.01,"exempt":12000}}};

const eur = n => (n < 0 ? '−€' : '€') + Math.round(Math.abs(n)).toLocaleString('en-US');
function bands(x, b){ let t = 0, lo = 0; for (const [hi, r] of b){ const top = hi ?? Infinity; if (x > lo) t += (Math.min(x, top) - lo) * r; lo = top; } return t; }
function credit(r){ if (r <= 15000) return 1955; if (r <= 28000) return 1910 + 1190 * (28000 - r) / 13000; if (r <= 50000) return 1910 * (50000 - r) / 22000 + (r > 25000 && r <= 35000 ? 65 : 0); return 0; }
function extra(r){ if (r > 20000 && r <= 32000) return 1000; if (r > 32000 && r < 40000) return 1000 * (40000 - r) / 8000; return 0; }
function calc(){
  const g = +document.getElementById('g').value || 0, c = N.cities[document.getElementById('city').value], n = +document.getElementById('inst').value;
  const inps = g * N.employee_inps + Math.max(0, g - N.extra_1pct_above) * 0.01;
  const tx = g - inps;
  const irpef = Math.max(0, bands(tx, N.irpef) - credit(tx) - extra(tx));
  const reg = bands(tx, c.regional), mun = tx > c.exempt ? tx * c.municipal : 0;
  const net = g - inps - irpef - reg - mun;
  const rows = [['給与総額', g], ['従業員の社会保険料', -inps], ['所得税(IRPEF、控除後)', -irpef], [`州付加税(${c.region})`, -reg], ['市付加税', -mun]];
  document.querySelector('#nt tbody').innerHTML = rows.map(([k, v]) => `<tr><td>${k}</td><td class="num">${eur(v)}</td></tr>`).join('') + `<tr><td><b>手取り</b></td><td class="num"><b>${eur(net)}</b></td></tr>`;
  document.getElementById('nm').textContent = `年${n}回の給与で1回あたり手取り約${eur(net / n)}(総額の${(net / g * 100).toFixed(0)}%)。`;
}
document.getElementById('nf').addEventListener('input', calc); document.getElementById('nf').addEventListener('submit', e => e.preventDefault()); calc();
})();</script>


---
Source: https://italykoyo.com/net-pay-calculator.html
