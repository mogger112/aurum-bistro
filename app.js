/* Аурум бистро — меню и заказ */
(function () {
  'use strict';

  // ---------- настройки ----------
  const CONFIG = {
    phone: '+7 (928) 064-46-46',
    whatsapp: '79280644646',      // номер, куда уходит заказ (wa.me)
    closeHour: 24,                // работаем до 00:00
    storageKey: 'aurum-cart-v1'
  };

  const MILK = ['кокосовом', 'миндальном', 'банановом'];

  // ---------- меню ----------
  // p — цена; sizes — варианты объёма с ценой; choice — выбор без доплаты;
  // img — фото из /img; hall — подаём только в зале (в онлайн-заказ не добавляется);
  // tint — цвета «холста», если фото нет.
  const MENU = [
    { part: 'kitchen', id: 'starters', title: 'Приготовьтесь, мы начинаем!', sub: 'стартеры в стол', chip: 'Стартеры', items: [
      { n: 'Сет мезе №1', d: 'баба гануш / хумус / мухаммара / мусс с тунцом', p: 590, img: 'g2' },
      { n: 'Сет мезе №2', d: 'перец рамиро с соусом тонато / лабне / мухаммара / луково-морковный мусс', p: 590 },
      { n: 'Домашние картофельные чипсы', d: 'картофель, козий сыр', p: 290 },
      { n: 'Вителло тоннато', d: 'ростбиф / соус с тунцом / разнотравье / каперсы', p: 490, img: 'm-vitello' },
      { n: 'Сет антипасти', d: 'артишок на гриле / микс оливок / сыры / кураговая мастарда', p: 750 },
      { n: 'Лангустины под чесночным соусом', d: 'лангустиновые креветки / сливочное масло / чеснок', p: 740 },
      { n: 'Запечённый камамбер с крутоном', d: 'камамбер / фундук / мёд / чиабатта / мастарда из кураги', p: 980 }
    ] },
    { part: 'kitchen', id: 'salads', title: '«Спасибо, мне только салат!»', sub: 'салаты', chip: 'Салаты', items: [
      { n: 'Зелёный салат с картофелем и яйцом', d: 'травы / беби картофель / яйцо / редис / соус лабне / чимичури', p: 480 },
      { n: 'Табуле / фалафель', d: 'фаршированный сыром фалафель / свежая зелень / томаты / огурцы / орзо', p: 480 },
      { n: 'Салат с томлёным мясом и томатами', d: 'травы / рваная говядина / розовые томаты / запечённые черри', p: 620 },
      { n: 'Салат Цезарь с индейкой', d: 'хрустящие листья романо / филе индейки / чиабатта / соус Цезарь / взрывные каперсы / сыр', p: 560 },
      { n: 'Салат Цезарь с лангустинами', d: 'хрустящие листья романо / лангустины / чиабатта / соус Цезарь / взрывные каперсы / сыр', p: 620, img: 'g3' }
    ] },
    { part: 'kitchen', id: 'warm', title: 'Теплее', sub: 'горячие закуски', chip: 'Горячие закуски', items: [
      { n: 'Чиз-тост с говяжьим беконом', d: 'бриошь / 3 вида сыра / говяжий бекон халяль / домашние чипсы / соус чимичури', p: 560 },
      { n: 'Армянский чиз-тост', d: 'бриошь / сыр блю-чиз / инжирный джем', p: 560 },
      { n: 'Картофель фри с козьим сыром', d: 'картофель фри / соус лабне / козий сыр', p: 290 },
      { n: 'Крокеты из трески с лаймовым майо', d: 'треска / картофель / лаймовый майо', p: 390 },
      { n: 'Тапас с томлёными овощами', d: 'луковый тартин / кабачок / перец болгарский / подвяленный черри', p: 460 },
      { n: 'Тапас с ростбифом', d: 'луковый тартин / ростбиф / микс салата', p: 490 }
    ] },
    { part: 'kitchen', id: 'mains', title: 'Горячо!', sub: 'основные блюда', chip: 'Основные', items: [
      { n: 'Шницель из баклажана', d: 'баклажан / травы / каперсы / томаты в азиатской заправке / соус ромеско', p: 520 },
      { n: 'Шницель из индейки', d: 'филе индейки / травы / каперсы / томаты в азиатском соусе / лаймовый майо', p: 680 },
      { n: 'Бриошь с телячьими щёчками и крепким бульоном', d: 'телячьи щёчки / бриошь / подвяленные черри / маринованный красный лук / крепкий бульон', p: 680 },
      { n: 'Соте из мидий под томатным соусом', d: 'мидии / томаты / чеснок / зелень; подаётся с хлебом тартин', p: 790 },
      { n: 'Соте из мидий под соусом блю-чиз', d: 'мидии / сыр блю-чиз / сливки; подаётся с хлебом тартин', p: 890 },
      { n: 'Френч-стейк с картофелем', d: 'стейк стриплойн / картофель фри / соус демиглас', p: 1100 }
    ] },
    { part: 'kitchen', id: 'pasta', title: 'Паста', chip: 'Паста', items: [
      { n: 'Фетучини с рваной говядиной', d: 'фетучини / рваная говядина / подвяленные томаты / пармезан', p: 690, img: 'm-fettuccine' },
      { n: 'Спагетти качо-пепе', d: 'спагетти / чёрный перец / козий сыр', p: 590 },
      { n: 'Спагетти карбонара с яичной боттаргой', d: 'спагетти / говяжий бекон халяль / яичная боттарга / пармезан', p: 660 }
    ] },
    { part: 'kitchen', id: 'desserts', title: 'Быстрый дофамин', sub: 'десерты', chip: 'Десерты', items: [
      { n: 'Креп-сюзет с мороженым', d: 'блины / апельсиновый соус / апельсины / мороженое', p: 480, img: 'm-crepe' },
      { n: 'Ромашковый крем-брюле', d: 'сливки / ромашка / карамельная корочка', p: 490 },
      { n: 'Чизкейк в банке', d: 'чизкейк / ягодное кули / песочная крошка', p: 490 },
      { n: 'Тирамису с шоколадной землёй', d: 'маскарпоне / савоярди / кофе / шоколадная земля', p: 560, img: 'm-tiramisu' }
    ] },

    { part: 'bar', id: 'black', title: 'Чёрный кофе', chip: 'Чёрный кофе', items: [
      { n: 'Эспрессо', p: 230 }, { n: 'Американо', p: 230 }, { n: 'Фильтр', p: 230 }
    ] },
    { part: 'bar', id: 'milk', title: 'Кофе с молоком', chip: 'С молоком', items: [
      { n: 'Капучино', sizes: [{ l: '200 мл', p: 320 }, { l: '300 мл', p: 360 }] },
      { n: 'Капучино на растительном молоке', d: 'кокосовое, миндальное или банановое', sizes: [{ l: '200 мл', p: 400 }, { l: '300 мл', p: 460 }], choice: { l: 'Молоко', v: MILK } },
      { n: 'Флэт уайт', p: 320 },
      { n: 'Латте', p: 360 },
      { n: 'Раф бобы тонка / амаретто', p: 440, choice: { l: 'Вкус', v: ['бобы тонка', 'амаретто'] } },
      { n: 'Раф урбеч', p: 410 }
    ] },
    { part: 'bar', id: 'cold', title: 'Холодный кофе', chip: 'Холодный кофе', items: [
      { n: 'Эспрессо тоник / клюква', p: 320 },
      { n: 'Бамбл апельсин / карамель', p: 440 },
      { n: 'Айс латте / карамель', p: 360 }
    ] },
    { part: 'bar', id: 'notcoffee', title: 'Не кофе', chip: 'Не кофе', items: [
      { n: 'Какао бобы тонка / банан', p: 390 },
      { n: 'Зелёная матча латте', p: 380 },
      { n: 'Розовая матча латте', p: 380 },
      { n: 'Айс матча кокос / манго / апельсин', p: 490 }
    ] },
    { part: 'bar', id: 'tea', title: 'Чай', chip: 'Чай', items: [
      { n: 'Красный чай (Китай)', p: 440 },
      { n: 'Зелёный чай (Китай)', p: 460 },
      { n: 'Сбор дагестанских трав', p: 390 },
      { n: 'Гречишный чай (Тайвань)', p: 460 },
      { n: 'Чай Лордов', d: 'Palais des Thés, чёрный', p: 480 },
      { n: 'Чай Лувра', d: 'Palais des Thés, зелёный', p: 480 }
    ] },
    { part: 'bar', id: 'nottea', title: 'Не чай', chip: 'Не чай', items: [
      { n: 'Слива / малина / копчёный чай', p: 490, img: 'm-tea' },
      { n: 'Облепиха / манго / саган дайля', p: 490 },
      { n: 'Имбирь / мята / мандарин / юдзу', p: 490 }
    ] },
    { part: 'bar', id: 'lemonade', title: 'Освежающие напитки', sub: 'лимонады', chip: 'Лимонады', items: [
      { n: 'Виноград / фейхоа / базилик', p: 440 },
      { n: 'Гранат / малина / сирень', p: 440, img: 'm-granat' },
      { n: 'Манго / маракуйя / османтус', p: 440, img: 'm-mango' },
      { n: 'Юдзу / лемонграсс / персик', p: 440 }
    ] },
    { part: 'bar', id: 'fresh', title: 'Фреши', chip: 'Фреши', note: 'Любой сок можно смешать по вашему желанию: напишите в комментарии к заказу.', items: [
      { n: 'Яблоко', p: 390 }, { n: 'Апельсин', p: 490 }, { n: 'Грейпфрут', p: 510 }, { n: 'Морковь', p: 390 }, { n: 'Сельдерей', p: 490 }
    ] },
    { part: 'bar', id: 'zero', title: 'Безалкогольные коктейли', chip: 'Коктейли 0%', items: [
      { n: 'Апельсин / маракуйя / ваниль', d: 'апероль 0% / игристое вино 0%', p: 510 },
      { n: 'Груша / жасмин / алоэ', d: 'тоник / джин 0%', p: 490 },
      { n: 'Клюква / гранат / черёмуха', d: 'амаро 0% / игристое вино 0%', p: 490 },
      { n: 'Юдзу / лемонграсс / пломбир', d: 'игристое вино 0%; сливочный коктейль с азиатскими цитрусовыми нотами', p: 510, img: 'm-yuzu' }
    ] },
    { part: 'bar', id: 'soft', title: 'Вода / софт', chip: 'Вода', items: [
      { n: 'Вода газированная', p: 160 }, { n: 'Вода негазированная', p: 160 }, { n: 'Coca-Cola', p: 270 }
    ] },
    { part: 'bar', id: 'art', title: 'Коктейли-картины', sub: 'только в зале', chip: 'Коктейли-картины', gallery: true,
      note: 'Авторские коктейли, названные в честь картин. Подаём только в зале, в онлайн-заказ не добавляются. 18+',
      items: [
        { n: 'Девушка с жемчужной серёжкой', d: 'на основе рома, с кокосовым послевкусием', p: 790, hall: true, tint: ['#1f3a5f', '#d9b45a'] },
        { n: 'Утро в сосновом лесу', d: 'джин-тоник с хвойным ароматом', p: 690, hall: true, tint: ['#2f4a33', '#c9b48a'] },
        { n: 'Красные рыбки', d: 'джин и цитрусы', p: 790, hall: true, tint: ['#24584f', '#c8432e'] },
        { n: 'Чёрный квадрат', d: 'джин / соджу / виноград / алоэ', p: 690, hall: true, img: 'm-chernyi-kvadrat' },
        { n: 'Девочка с персиками', d: 'джин / соджу / игристое', p: 890, hall: true, img: 'm-devochka' },
        { n: 'Тайная вечеря', d: 'лавандовый портвейн', p: 890, hall: true, img: 'm-vecherya' },
        { n: 'Подсолнухи', d: 'авторский коктейль', p: 790, hall: true, tint: ['#7a5a1c', '#e9c040'] }
      ] }
  ];

  // индекс позиций
  const ITEMS = new Map();
  MENU.forEach(cat => cat.items.forEach((it, i) => {
    it.id = cat.id + '-' + i;
    it.cat = cat.id;
    ITEMS.set(it.id, it);
  }));

  // ---------- утилиты ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const rub = n => n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₽';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const imgSrc = name => 'img/' + name + '.jpg';
  const priceLabel = it => it.sizes ? it.sizes.map(s => s.p).join(' / ') + ' ₽' : rub(it.p);
  const needsPicker = it => !!(it.sizes || it.choice);

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* хранилище недоступно */ } }
  };

  // ---------- отрисовка меню ----------
  function addButton(it, cls = '') {
    if (it.hall) return '<span class="in-hall">в зале</span>';
    return `<button class="add ${cls}" type="button" data-add="${it.id}" aria-label="Добавить «${esc(it.n)}» в заказ">${cls ? '+ В заказ' : '+'}</button>`;
  }

  function pieceHTML(it) {
    const art = it.img
      ? `<img src="${imgSrc(it.img)}" alt="${esc(it.n)}" loading="lazy">`
      : `<div class="canvas-ph" style="background:radial-gradient(120% 90% at 30% 25%, ${it.tint[1]}, ${it.tint[0]} 70%)">${esc(it.n)}</div>`;
    return `<article class="piece">
      <div class="frame">${art}</div>
      <div class="plaque">
        <h4>${esc(it.n)}</h4>
        ${it.d ? `<p>${esc(it.d)}</p>` : ''}
        <div class="plaque__foot"><span class="plaque__price">${priceLabel(it)}</span>${addButton(it, 'add--text')}</div>
      </div>
    </article>`;
  }

  function dishHTML(it) {
    const thumb = it.img
      ? `<button class="dish__thumb" type="button" data-zoom="${it.img}" aria-label="Фото: ${esc(it.n)}"><div class="frame frame--sm"><img src="${imgSrc(it.img)}" alt="" loading="lazy"></div></button>`
      : '';
    return `<li class="dish">${thumb}
      <div>
        <div class="dish__head"><h4 class="dish__name">${esc(it.n)}</h4><span class="dish__lead"></span><span class="dish__price">${priceLabel(it)}</span></div>
        ${it.d ? `<p class="dish__desc">${esc(it.d)}</p>` : ''}
      </div>
      ${addButton(it)}
    </li>`;
  }

  function renderMenu() {
    const featured = [...ITEMS.values()].filter(it => it.img && !it.hall);
    $('[data-featured]').innerHTML = featured.map(pieceHTML).join('');

    let html = '', part = null;
    MENU.forEach(cat => {
      if (cat.part !== part) {
        part = cat.part;
        html += `<h3 class="part-title" id="part-${part}">${part === 'kitchen' ? 'kitchen' : 'bar'}</h3>`;
      }
      html += `<section class="cat" id="cat-${cat.id}" aria-labelledby="h-${cat.id}">
        <div class="cat__head">
          <h3 class="cat__title" id="h-${cat.id}">${esc(cat.title)}</h3>
          ${cat.sub ? `<span class="cat__sub">${esc(cat.sub)}</span>` : ''}
          ${cat.note ? `<p class="cat__note">${esc(cat.note)}</p>` : ''}
        </div>
        ${cat.gallery
          ? `<div class="pieces">${cat.items.map(pieceHTML).join('')}</div>`
          : `<ul class="dishes">${cat.items.map(dishHTML).join('')}</ul>`}
      </section>`;
    });
    $('[data-menu]').innerHTML = html;

    // чипсы навигации
    let chips = '', p2 = null;
    MENU.forEach(cat => {
      if (cat.part !== p2) { p2 = cat.part; chips += `<span class="chip-sep" aria-hidden="true">${p2 === 'kitchen' ? 'kitchen' : 'bar'}</span>`; }
      chips += `<a class="chip" href="#cat-${cat.id}" data-chip="${cat.id}">${esc(cat.chip)}</a>`;
    });
    $('[data-chips-list]').innerHTML = chips;
  }

  function watchChips() {
    if (!('IntersectionObserver' in window)) return;
    const list = $('[data-chips-list]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace('cat-', '');
        $$('.chip', list).forEach(c => c.classList.toggle('is-active', c.dataset.chip === id));
        const active = $(`[data-chip="${id}"]`, list);
        if (active) list.scrollTo({ left: active.offsetLeft - 40, behavior: 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.cat').forEach(s => io.observe(s));
  }

  // ---------- корзина ----------
  // строка: { key, id, size, choice, qty }
  let cart = (store.get(CONFIG.storageKey) || []).filter(l => ITEMS.has(l.id) && l.qty > 0);

  const linePrice = l => {
    const it = ITEMS.get(l.id);
    return it.sizes ? (it.sizes.find(s => s.l === l.size) || it.sizes[0]).p : it.p;
  };
  const cartCount = () => cart.reduce((s, l) => s + l.qty, 0);
  const cartSum = () => cart.reduce((s, l) => s + l.qty * linePrice(l), 0);
  const lineOpts = l => [l.size, l.choice && (ITEMS.get(l.id).choice.l === 'Молоко' ? 'на ' + l.choice + ' молоке' : l.choice)].filter(Boolean).join(', ');

  function addToCart(id, size, choice) {
    const key = [id, size || '', choice || ''].join('|');
    const line = cart.find(l => l.key === key);
    if (line) line.qty++; else cart.push({ key, id, size: size || null, choice: choice || null, qty: 1 });
    saveCart();
    toast('Добавлено: ' + ITEMS.get(id).n);
    const btn = $('.cart-btn');
    btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  }

  function setQty(key, delta) {
    const line = cart.find(l => l.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(l => l !== line);
    saveCart();
  }

  function saveCart() {
    store.set(CONFIG.storageKey, cart);
    renderCart();
  }

  function renderCart() {
    const count = cartCount(), sum = cartSum();
    $$('[data-cart-count]').forEach(el => { el.textContent = count; });
    $$('[data-cart-sum]').forEach(el => { el.textContent = rub(sum); });
    $('.cart-bar').hidden = count === 0 || !$('[data-drawer]').hidden;

    $('[data-lines]').innerHTML = cart.map(l => {
      const it = ITEMS.get(l.id), opts = lineOpts(l);
      return `<li class="line">
        <div><div class="line__name">${esc(it.n)}</div>${opts ? `<div class="line__opt">${esc(opts)}</div>` : ''}</div>
        <div class="line__sum">${rub(l.qty * linePrice(l))}</div>
        <div class="qty">
          <button type="button" data-qty="-1" data-key="${esc(l.key)}" aria-label="Убрать одну порцию">−</button>
          <span>${l.qty}</span>
          <button type="button" data-qty="1" data-key="${esc(l.key)}" aria-label="Добавить ещё одну">+</button>
        </div>
      </li>`;
    }).join('');
    $('[data-empty]').hidden = count > 0;
    if (step === 'cart') $('[data-next]').disabled = count === 0;
  }

  // ---------- выбор вариантов ----------
  let pickerItem = null;
  function openPicker(it) {
    pickerItem = it;
    $('[data-picker-title]').textContent = it.n;
    let body = '';
    if (it.sizes) {
      body += `<fieldset class="seg"><legend>Объём</legend>${it.sizes.map((s, i) =>
        `<label><input type="radio" name="p-size" id="p-size-${i}" value="${esc(s.l)}" ${i === 0 ? 'checked' : ''}><span>${esc(s.l)} · ${rub(s.p)}</span></label>`).join('')}</fieldset>`;
    }
    if (it.choice) {
      body += `<fieldset class="seg"><legend>${esc(it.choice.l)}</legend>${it.choice.v.map((v, i) =>
        `<label><input type="radio" name="p-choice" id="p-choice-${i}" value="${esc(v)}" ${i === 0 ? 'checked' : ''}><span>${esc(v)}</span></label>`).join('')}</fieldset>`;
    }
    $('[data-picker-body]').innerHTML = body;
    $('[data-picker]').hidden = false;
    $('[data-picker-add]').focus();
  }
  function closePicker() { $('[data-picker]').hidden = true; pickerItem = null; }

  // ---------- шторка заказа ----------
  let step = 'cart';
  let lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    $('[data-drawer]').hidden = false;
    document.body.style.overflow = 'hidden';
    if (step === 'done') { /* показываем результат */ } else goStep('cart');
    renderCart();
    $('.drawer__panel .icon-btn').focus();
  }
  function closeDrawer() {
    $('[data-drawer]').hidden = true;
    document.body.style.overflow = '';
    if (step === 'done') { step = 'cart'; }
    renderCart();
    if (lastFocus) lastFocus.focus();
  }

  function goStep(s) {
    step = s;
    $$('[data-step]').forEach(el => { el.hidden = el.dataset.step !== s; });
    $('[data-drawer-title]').textContent = s === 'checkout' ? 'Оформление' : s === 'done' ? 'Готово' : 'Ваш заказ';
    $('[data-foot]').hidden = s === 'done';
    $('[data-back]').hidden = s !== 'checkout';
    $('[data-next]').textContent = s === 'checkout' ? 'Сформировать заказ' : 'Оформить';
    $('[data-next]').disabled = s === 'cart' && cartCount() === 0;
    if (s === 'checkout') { fillTimes(); syncType(); }
  }

  // ---------- форма ----------
  const form = $('form[data-step="checkout"]');

  function fillTimes() {
    const sel = $('#f-time');
    const prev = sel.value;
    const opts = ['<option value="Как можно скорее">Как можно скорее</option>'];
    const t = new Date();
    t.setMinutes(t.getMinutes() + 45);
    t.setMinutes(Math.ceil(t.getMinutes() / 15) * 15, 0, 0);
    const end = new Date(); end.setHours(CONFIG.closeHour, 0, 0, 0); end.setMinutes(end.getMinutes() - 30);
    while (t <= end) {
      const v = t.toTimeString().slice(0, 5);
      opts.push(`<option value="к ${v}">к ${v}</option>`);
      t.setMinutes(t.getMinutes() + 15);
    }
    sel.innerHTML = opts.join('');
    if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
  }

  function orderType() { return (form.querySelector('input[name="type"]:checked') || {}).value || 'delivery'; }
  function syncType() {
    const type = orderType();
    $$('[data-for]', form).forEach(el => { el.hidden = el.dataset.for !== type; });
    $$('[data-not]', form).forEach(el => { el.hidden = el.dataset.not === type; });
  }

  function formatPhone(v) {
    let d = v.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d && !d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
    let out = '+7';
    if (p[0]) out += ' (' + p[0];
    if (p[0].length === 3) out += ')';
    if (p[1]) out += ' ' + p[1];
    if (p[2]) out += '-' + p[2];
    if (p[3]) out += '-' + p[3];
    return d ? out : '';
  }

  function setErr(name, msg) {
    const p = $(`[data-err="${name}"]`, form);
    if (p) { p.textContent = msg || ''; p.closest('.field').classList.toggle('has-err', !!msg); }
  }

  function validate() {
    const type = orderType();
    const name = $('#f-name').value.trim();
    const phone = $('#f-phone').value.replace(/\D/g, '');
    const address = $('#f-address').value.trim();
    const table = $('#f-table').value.trim();
    let ok = true, first = null;
    const check = (cond, field, msg, el) => { setErr(field, cond ? '' : msg); if (!cond) { ok = false; first = first || el; } };
    check(name.length >= 2, 'name', 'Напишите, как к вам обращаться.', $('#f-name'));
    check(phone.length === 11, 'phone', 'Нужен номер из 11 цифр, например +7 (928) 000-00-00.', $('#f-phone'));
    if (type === 'delivery') check(address.length >= 5, 'address', 'Укажите улицу и дом.', $('#f-address'));
    else setErr('address', '');
    if (type === 'hall') check(table.length > 0, 'table', 'Укажите номер столика: он есть на табличке на столе.', $('#f-table'));
    else setErr('table', '');
    if (first) first.focus();
    return ok;
  }

  function buildOrder() {
    const type = orderType();
    const no = 'A-' + String(Math.floor(1000 + Math.random() * 9000));
    const typeLabel = { delivery: 'Доставка', pickup: 'Самовывоз', hall: 'К столику' }[type];
    const when = type === 'hall' ? '' : ' · ' + $('#f-time').value.toLowerCase();
    const lines = cart.map(l => {
      const it = ITEMS.get(l.id), opts = lineOpts(l);
      return `• ${it.n}${opts ? ' (' + opts + ')' : ''} × ${l.qty} — ${rub(l.qty * linePrice(l))}`;
    });
    const rows = [
      `Заказ ${no} — Аурум бистро`,
      `${typeLabel}${when}`,
      '',
      ...lines,
      '',
      `Итого: ${rub(cartSum())}${type === 'delivery' ? ' + доставка' : ''}`,
      '',
      `Имя: ${$('#f-name').value.trim()}`,
      `Телефон: ${$('#f-phone').value.trim()}`
    ];
    if (type === 'delivery') rows.push(`Адрес: ${$('#f-address').value.trim()}`);
    if (type === 'hall') rows.push(`Столик: ${$('#f-table').value.trim()}`);
    rows.push(`Оплата: ${(form.querySelector('input[name="pay"]:checked') || {}).value}`);
    const comment = $('#f-comment').value.trim();
    if (comment) rows.push(`Комментарий: ${comment}`);
    return { no, text: rows.join('\n').replace(/ /g, ' ').replace(/ /g, ' ') };
  }

  function submitOrder() {
    if (!validate()) return;
    const order = buildOrder();
    store.set('aurum-last-order', { no: order.no, text: order.text, at: Date.now() });
    $('[data-order-no]').textContent = order.no;
    $('[data-order-text]').textContent = order.text;
    $('[data-wa]').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(order.text)}`;
    cart = [];
    store.set(CONFIG.storageKey, cart);
    goStep('done');
    renderCart();
  }

  // ---------- мелочи ----------
  let toastTimer;
  function toast(msg) {
    const t = $('[data-toast]');
    t.textContent = msg; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 1800);
  }

  function zoom(name) {
    const z = document.createElement('div');
    z.className = 'zoom';
    z.innerHTML = `<div class="frame"><img src="${imgSrc(name)}" alt=""></div>`;
    z.addEventListener('click', () => z.remove());
    document.body.appendChild(z);
  }

  // ---------- события ----------
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-add],[data-open-cart],[data-close-cart],[data-qty],[data-next],[data-back],[data-close-picker],[data-picker-add],[data-zoom],[data-copy]');
    if (!t) return;
    if (t.dataset.add) {
      const it = ITEMS.get(t.dataset.add);
      if (needsPicker(it)) openPicker(it); else addToCart(it.id);
    } else if (t.hasAttribute('data-open-cart')) openDrawer();
    else if (t.hasAttribute('data-close-cart')) closeDrawer();
    else if (t.dataset.qty) setQty(t.dataset.key, Number(t.dataset.qty));
    else if (t.hasAttribute('data-next')) { if (step === 'cart') goStep('checkout'); else submitOrder(); }
    else if (t.hasAttribute('data-back')) goStep('cart');
    else if (t.hasAttribute('data-close-picker')) closePicker();
    else if (t.hasAttribute('data-picker-add') && pickerItem) {
      const size = (document.querySelector('input[name="p-size"]:checked') || {}).value;
      const choice = (document.querySelector('input[name="p-choice"]:checked') || {}).value;
      addToCart(pickerItem.id, size, choice);
      closePicker();
    } else if (t.dataset.zoom) zoom(t.dataset.zoom);
    else if (t.hasAttribute('data-copy')) {
      const text = $('[data-order-text]').textContent;
      const done = () => toast('Текст заказа скопирован');
      const fallback = () => {
        const r = document.createRange(); r.selectNodeContents($('[data-order-text]'));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        toast('Текст выделен — скопируйте его');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const z = $('.zoom');
    if (z) z.remove();
    else if (!$('[data-picker]').hidden) closePicker();
    else if (!$('[data-drawer]').hidden) closeDrawer();
  });

  form.addEventListener('change', e => { if (e.target.name === 'type') syncType(); });
  form.addEventListener('submit', e => { e.preventDefault(); submitOrder(); });
  $('#f-phone').addEventListener('input', e => { e.target.value = formatPhone(e.target.value); });
  $('#f-phone').addEventListener('focus', e => { if (!e.target.value) e.target.value = '+7'; });

  // ---------- свет люстры ----------
  function chandelier() {
    const canvas = $('.hero__light');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, visible = true, raf = 0, last = 0;

    // лучи-«прожилки» от хрусталя: угол, ширина, яркость, фаза мерцания
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const rays = Array.from({ length: 90 }, () => ({
      a: Math.PI / 2 + (rnd() - .5) * 2.3,
      w: .6 + rnd() * 3.2,
      al: .025 + rnd() * .07,
      len: .45 + rnd() * .65,
      s: .2 + rnd() * .6,
      ph: rnd() * 6.28
    }));

    function size() {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const wide = w > 900;
      const ox = wide ? w * .72 : w * .5, oy = -h * .08;
      const R = Math.hypot(w, h);

      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R * .75);
      g.addColorStop(0, 'rgba(255, 236, 205, .20)');
      g.addColorStop(.3, 'rgba(240, 222, 190, .07)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      for (const r of rays) {
        const a = r.a + Math.sin(t * .00025 * r.s + r.ph) * .012;
        const flick = .55 + .45 * Math.sin(t * .0011 * r.s + r.ph * 2);
        const L = R * r.len;
        const x2 = ox + Math.cos(a) * L, y2 = oy + Math.sin(a) * L;
        const lg = ctx.createLinearGradient(ox, oy, x2, y2);
        const al = r.al * flick;
        lg.addColorStop(0, `rgba(255, 240, 215, 0)`);
        lg.addColorStop(.18, `rgba(255, 240, 215, ${al})`);
        lg.addColorStop(1, 'rgba(255, 240, 215, 0)');
        ctx.strokeStyle = lg; ctx.lineWidth = r.w;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(x2, y2); ctx.stroke();
      }
    }

    function loop(t) {
      raf = 0;
      if (!visible) return;
      if (t - last > 33) { draw(t); last = t; }
      raf = requestAnimationFrame(loop);
    }

    size(); draw(0);
    window.addEventListener('resize', () => { size(); draw(performance.now()); });
    if (reduce) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      }).observe(canvas);
    }
    raf = requestAnimationFrame(loop);
  }

  // ---------- старт ----------
  renderMenu();
  watchChips();
  goStep('cart');
  renderCart();
  chandelier();
})();
