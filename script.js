document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sel = btn.getAttribute('data-target');
      var target = document.querySelector(sel);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var backTop = document.getElementById('backToTop');
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var stepData = [
    {
      index: '01', tag: '從收件開始',
      title: '先理解資料，再整理案件',
      body: '這份工作一開始，我先熟悉公報的完整流程：從公務信箱收件、下載檔案開始，接著人工整理與分類，再按照公報編排順序及固定架構進行編製，最後交由專員與科長校對。',
      note: 'AI 協助分類，人工保留最終判讀。'
    },
    {
      index: '02', tag: '逐件編製',
      title: '先產出格式，再交給下一步',
      body: '把各機關送件分別交由 GPT 生成對應的公報格式 Word 檔，降低一次處理過多資料所造成的內容與版面錯誤，也比較容易定位問題。',
      note: '人工保留縮排、行距、字距與表格內外間距。'
    },
    {
      index: '03', tag: '整期統整',
      title: '將逐件成果整合成一期公報',
      body: '把已整理完成的 Word 檔共同提供給 GPT，統整成一整期公報，包含整期順序、模板外框、分節、頁碼、目次與版權頁。',
      note: '共同驗收整期版面與內容一致性。'
    },
    {
      index: '04', tag: '校對',
      title: '找出疑點，保留人工決定權',
      body: '檢查錯字、漏字、重複字、日期、標點符號、目次、頁碼與版面等項目，涉及法規、日期、數字與原文意旨的問題標示為「待人工確認」。',
      note: '多個 AI 交叉校對，提升錯誤搜尋完整度。'
    }
  ];

  var stepButtons = document.querySelectorAll('.step-button');
  var detailIndex = document.querySelector('.detail-index');
  var detailTag = document.querySelector('.detail-top p');
  var detailTitle = document.querySelector('.step-detail h3');
  var detailBody = document.querySelector('.detail-body');

  stepButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      stepButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var i = parseInt(btn.getAttribute('data-step'), 10);
      var d = stepData[i];
      if (!d) return;
      detailIndex.textContent = d.index;
      detailTag.textContent = d.tag;
      detailTitle.textContent = d.title;
      detailBody.textContent = d.body;
      var noteEl = document.querySelector('.detail-note');
      noteEl.innerHTML = '<span>✦</span>' + d.note;
    });
  });

  var toggleButtons = document.querySelectorAll('.toggle-group button');
  var comparisonLine = document.querySelector('.comparison-line');
  var comparisonText = document.querySelector('.comparison-card p');

  var modes = {
    before: {
      html: '<span>各機關送件</span><b>→</b><span>模板 + 全部原始檔案</span><b>→</b><span>一次生成整期公報</span>',
      text: '直接將所有原始送件與模板一次上傳，容易因單次處理資料量過大，導致內容與版面錯誤增加，也較難定位問題來源。',
      lineClass: 'before'
    },
    after: {
      html: '<span>各機關送件</span><b>→</b><span>逐件公報格式 Word</span><b>→</b><span>整期統整</span>',
      text: '這種「先逐機關編製、最後整期統整」的方式，能降低 GPT 一次處理過多資料所造成的內容與版面錯誤，也比較容易定位問題。',
      lineClass: 'after'
    }
  };

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleButtons.forEach(function (b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      var mode = btn.getAttribute('data-mode');
      var m = modes[mode];
      if (!m) return;
      comparisonLine.innerHTML = m.html;
      comparisonLine.className = 'comparison-line ' + m.lineClass;
      comparisonText.textContent = m.text;
    });
  });
});
