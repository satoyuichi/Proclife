const ONE_POINT_ADVICES = [
    { advice: "定期的に PJS の見直しをしよう。" },
    { advice: "日誌の記入をしよう。" },
    { advice: "消費者から生産者になろう。" },
    { advice: "ググる側からググられる側になろう。" },
    { advice: "小さく！細かく！早く！" },
    { advice: "ポートフォリオは随時更新しておこう。後でまとめようと思うと忘れちゃうぞ。" },

    { advice: "出した成果は進学やインターン/就職にも使える。三年次の春までに 3 つ以上を目指そう！日誌やポートフォリオも後で役に立つ！" },
    { advice: "LT 大会や成果発表会でプレゼンの腕を磨こう！大会やコンテストの実績を積むのも良し！" },
    { advice: "早めにオープンキャンパスや説明会などに行っておこう。" },
    { advice: "腕試しにインターン/アルバイトにも挑戦しよう。実績にもなるぞ！" },
    { advice: "6 月末にはリストアップしておきたい。調査書や評定平均を出すために8/15までのレポートを終わらせる必要もある。" },
    { advice: "実績があれば安心！日誌やポートフォリオがお粗末だと泣きを見るぞ！" },
    { advice: "まずは、「プログラミング入門 Web アプリ」の第２章までは理解しておこう！" },
];

function getRandom(n) {
    return Math.floor(Math.random() * (n - 1 - 0)) + 0;
}

M.AutoInit ();

let annual = 0;

document.addEventListener('DOMContentLoaded', function() {
    let annualElem = document.querySelector('#annual');
    let annualOptions = {
	classes: '',
	dropdownOptions: {}
    };
    M.FormSelect.init(annualElem, annualOptions);

    annualElem.addEventListener('change', function() {
	annual = parseInt(this.value);
	console.log(annual);
    });

    let carouselElem = document.querySelector('.carousel');
    let carouselOptions = {
	duration: 100,
	padding: 0,
	numVisible: 3,
    };
    let carouselInstance = M.Carousel.init(carouselElem, carouselOptions);
    carouselInstance.set(getRandom(8));
});

let app = new Vue({
    el: '#app',
    data: {
	advice: ONE_POINT_ADVICES[0].advice,
	date: ' ',
	time: ' ',
	graphs: [
	    { label: '今日', val: 0 },
	    { label: '今週', val: 0 },
	    { label: '今月', val: 0 },
	    { label: '半期', val: 0 },
	    { label: '今年度', val: 0 },
	    { label: 'プロクラ', val: 0 }
	]
    },
    methods: {
	updateAdvice: function(event) {
	    let index = getRandom(ONE_POINT_ADVICES.length);
	    this.advice = ONE_POINT_ADVICES[index].advice;
	}
    }
});

window.setInterval (
    function () {
	let now = dayjs();
	app.date = now.format('YYYY/MM/DD');
	app.time = now.format('HH:mm:ss');

	// 今日のグラフ
	app.graphs[0].val = Math.max(0, 100 * (Math.min(now, dayjs().hour(17).minute(30)) - dayjs().hour(9).minute(30)) / (dayjs().hour(17).minute(30) - dayjs().hour(9).minute(30)));
	// 今週のグラフ
	app.graphs[1].val = Math.max(0, 100 * (now - dayjs().startOf('w').day(2)) / (dayjs().startOf('w').day(6) - dayjs().startOf('w').day(2)));
	// 今月のグラフ
	app.graphs[2].val = Math.max(0, 100 * (now - dayjs().startOf('M')) / (dayjs().endOf('M') - dayjs().startOf('M')));
	// 半期のグラフ
	if (now.isBefore('2020-9-30')) {
	    app.graphs[3].val = Math.max(0, 100 * (now - dayjs('2020-04-13')) / (dayjs('2020-09-30') - dayjs('2020-04-13')));
	}
	else {
	    app.graphs[3].val = Math.max(0, 100 * (now - dayjs('2020-10-01')) / (dayjs('2021-03-20') - dayjs('2020-10-01')));
	}
	// 今年度のグラフ
	app.graphs[4].val = Math.max(0, 100 * (now - dayjs('2020-04-13')) / (dayjs('2021-03-20') - dayjs('2020-04-03')));
	// プロクラのグラフ
	app.graphs[5].val = Math.max(0, 100 * (now - dayjs('2020-04-01').subtract(annual, 'y')) / (dayjs('2021-03-31') - dayjs('2020-04-01').subtract(annual, 'y')));
    },
    1000
);
