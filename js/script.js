/**
 * @fileoverview furaigo5 Workspace - メインスクリプト
 * ナビゲーションのスムーズスクロールとモバイルメニューの制御を担当
 * @author Gotanno Tsubasa
 */

/**
 * DOMContentLoadedイベントで初期化処理を実行
 */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
});

/**
 * ナビゲーションリンクにスムーズスクロール機能を追加する
 * ヘッダーの高さを考慮したオフセット付きスクロールを実現
 * @author Gotanno Tsubasa
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 70;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        });
    });
}

/**
 * モバイルメニューの開閉機能を初期化する
 * ハンバーガーボタンのクリックでナビゲーションの表示/非表示を切り替える
 * @author Gotanno Tsubasa
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}

/**
 * モバイルメニューを閉じる
 * ナビゲーションリンククリック時に呼び出される
 * @author Gotanno Tsubasa
 */
function closeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');

    if (menuBtn && nav) {
        menuBtn.classList.remove('active');
        nav.classList.remove('active');
    }
}

/**
 * スクロール位置に応じてヘッダーのスタイルを変更する
 * ページ上部ではより透明に、スクロール時は不透明になる
 * @author Gotanno Tsubasa
 */
function initHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
