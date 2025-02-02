document.addEventListener("DOMContentLoaded", function () {
    // フローティングメニューをクリックすることで表示内容を変更する
    const links = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll(".section");

    const defaultSectionId = "home-section"; // homeの内容
     // homeを初期表示するリンクdefaultLinkを定義
    const defaultLink = document.querySelector(`.menu-link[data-target="home"]`);

    sections.forEach(section => {
        if (section.id === defaultSectionId) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });

    // 初期表示するボタンに'current'を付与
    links.forEach(link => link.classList.remove("current"));
    if (defaultLink) {
        defaultLink.classList.add("current");
    }

    // メニューのボタンをクリックしたとき、そのボタンの色を変更する
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // デフォルトの挙動（ページ遷移）を防ぐ
            const targetId = this.getAttribute("data-target") + "-section";

            // 全てのセクションを非表示
            sections.forEach(section => {
                section.classList.add("hidden");
            });

            // クリックされたリンクに対応するセクションを表示
            document.getElementById(targetId).classList.remove("hidden");

            // メニューの色を変更（current クラスを適用）
            links.forEach(l => l.classList.remove("current")); // すべてのリンクから current を削除
            this.classList.add("current"); // クリックしたリンクに current を付与
        });
    });

    // スクロール時に要素をフェードインする処理
    const fadeElements = document.querySelectorAll(".fade-in-section");
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                element.classList.add("fade-in");
            }
        });
    };
    
    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // 初回チェック
});
