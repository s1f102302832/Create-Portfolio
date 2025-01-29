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
});
