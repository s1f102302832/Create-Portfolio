document.addEventListener("DOMContentLoaded", function () {
    // フローティングメニューをクリックすることで表示内容を変更する
    const links = document.querySelectorAll(".menu-link");
    const sections = document.querySelectorAll(".section");

    const defaultSectionId = "home-section"; // homeの内容
     // homeを初期表示するリンクdefaultLinkを定義
    const defaultLink = document.querySelector(`.menu-link[data-target="home"]`);

    // 初期表示処理
    sections.forEach(section => {
        section.classList.add("hidden"); // すべて非表示
    });

    document.getElementById(defaultSectionId).classList.remove("hidden");

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

            // クリックされたセクションを表示し、アニメーションクラスを再適用
            const targetSection = document.getElementById(targetId);
            targetSection.classList.remove("hidden");

            // 一旦クラスを削除して再適用（アニメーションをリセット）
            targetSection.classList.remove("fade-in-right", "fade-in-up");
            void targetSection.offsetWidth; // 強制的にリフローさせる
            targetSection.classList.add(targetSection.dataset.animation);

            // メニューの色を変更（current クラスを適用）
            links.forEach(l => l.classList.remove("current")); // すべてのリンクから current を削除
            this.classList.add("current"); // クリックしたリンクに current を付与
        });
    });
});
