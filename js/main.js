document.addEventListener("DOMContentLoaded", function () {
    // フローティングメニューをクリックすることで表示内容を変更する
    const links = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll(".section");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); //デフォルトの挙動（ページ遷移を防ぐ）
            const targetId = this.getAttribute("data-target") + "-section";

            // 全てのセクションを非表示
            sections.forEach(section => {
                section.classList.add("hidden");
            });

            // クリックされたリンクに対応するセクションを表示
            document.getElementById(targetId).classList.remove("hidden");
        });
    });

    // 現在地点のリンクを異なる色で表示
    const updateCurrentSection = () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("current"); // すべてのボタンから current を削除
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("current"); // 現在のコンテンツのボタンに current を付与
            }
        });
    };

    window.addEventListener("scroll", updateCurrentSection);
    updateCurrentSection(); // ページ読み込み時にも適用
});
